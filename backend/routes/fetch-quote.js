const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
	const { stocksymbol } = req.body;
	const url = `https://finnhub.io/api/v1/quote?symbol=${stocksymbol}&token=${process.env.FINN_API_KEY}`;

	try {
		const response = await fetch(url);
		const sendRes = await response.json();
		res.json(sendRes);
	} catch (err) {
		next(err);
	}
});

module.exports = router