import axios from "axios";

export const searchSymbol = async (query) => {
	const response = await axios({
		method: "post",
		url: `${import.meta.env.VITE_API_BASE}/api/search-symbol/`,
		data: {
			search: query,
		}
	})

	return response.data
};

export const fetchStockDetails = async (stockSymbol) => {
	const response = await axios({
		method: "post",
		url: `${import.meta.env.VITE_API_BASE}/api/stock-details/`,
		data: {
			stocksymbol: stockSymbol,
		},
	})

	return response.data
};

export const fetchQuote = async (stockSymbol) => {
	const response = await axios({
		method: "post",
		url: `${import.meta.env.VITE_API_BASE}/api/fetch-quote/`,
		data: {
			stocksymbol: stockSymbol,
		},
	})

	return response.data
};

export const fetchHistoricalData = async (
	stockSymbol,
	resolution,
	from,
	to
) => {
	const response = await axios({
		method: "post",
		url: `${import.meta.env.VITE_API_BASE}/api/historical-stock-data/`,
		data: {
			stocksymbol: stockSymbol,
			resolution,
			from,
			to,
		},
	});
	return response.data;
};
