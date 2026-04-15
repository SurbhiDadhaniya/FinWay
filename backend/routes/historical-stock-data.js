const express = require("express");
const router = express.Router();
const MOCK_DATA = "/data/hist-data.json";
const fs = require("fs");
const path = require("path");
const process = require("process");
router.post("/", async (req, res, next) => {
	const { stocksymbol, resolution, from, to } = req.body;
	try {
		let func =
			resolution === "1D"
				? "TIME_SERIES_INTRADAY"
				: resolution === "1W"
				? "TIME_SERIES_DAILY"
				: resolution === "1M"
				? "TIME_SERIES_WEEKLY"
				: "TIME_SERIES_MONTHLY";
		let series =
			resolution === "1D"
				? "Time Series (30min)"
				: resolution === "1W"
				? "Time Series (Daily)"
				: resolution === "1M"
				? "Weekly Time Series"
				: "Monthly Time Series";
		const apiUrl = new URL("https://www.alphavantage.co/query");
		apiUrl.searchParams.append("function", func);
		apiUrl.searchParams.append("symbol", stocksymbol);
		if (resolution === "1D") apiUrl.searchParams.append("interval", "30min");
		if (resolution === "1M")
			apiUrl.searchParams.append("outputsize", "compact");
		apiUrl.searchParams.append(
			"apikey",
			process.env.ALPHAV_API_KEY || "8LQH0RJ8ZT0KQ9ZT"
		);
		const jsonData = fs.readFileSync(path.join(process.cwd(), MOCK_DATA));
		const allData = JSON.parse(jsonData);
		const pData = allData[stocksymbol] || {};
		let resJson = pData;
		if (
			pData[series] === undefined ||
			filterData(pData, series, from, to).length < 2 ||
			process.env.HIS_MOCK_DATA === "true"
		) {
			const response = await fetch(apiUrl);
			resJson = await response.json();
			if (resJson["Meta Data"] === undefined) {
    			console.warn("Live API returned no data, falling back to mock:", resJson);
    			if (!pData[series]) {
        			return res.status(503).json({ error: "No data available for this stock yet." });
    			}
    			resJson = pData;
			}
}
			else {
				pData[series] = resJson[series];
				allData[stocksymbol] = pData;
    			fs.writeFileSync(
        			path.join(process.cwd(), MOCK_DATA),
        			JSON.stringify(allData)
    		);
			}
		}

		let resObj = {
			c: [],
			t: [],
		};
		let dts = filterData(resJson, series, from, to);
		const desc = Object.getOwnPropertyDescriptors(resJson[series]);
		if (dts.length <= 2) {
			for (let i = 0; i < 5; i++) {
				resObj.c.push(parseInt(desc[Object.keys(resJson[series])[i]].value["4. close"]));
				resObj.t.push(Date.parse(Object.keys(resJson[series])[i]) / 1000);
			}
		} else {
			for (const x of dts) {
				resObj.t.push(Date.parse(x) / 1000);
				resObj.c.push(parseInt(desc[x].value["4. close"]));
			}
		}

		res.json(resObj);

		function filterData(obj, s, from, to) {
			return Object.keys(obj[s]).filter((x) => {
				return Date.parse(x) / 1000 >= from && Date.parse(x) / 1000 <= to;
			});
		};
	} catch (err) {
		next(err);
	}
});

module.exports = router;
