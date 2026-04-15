const routes = require("express").Router();
const ytDetails = require("./yt-details");
const histSData = require("./historical-stock-data");
const fetchQuote = require("./fetch-quote");
const searchSymbol = require("./search-symbol");
const stockDetails = require("./stock-details");

routes.use("/yt-details", ytDetails);
routes.use("/historical-stock-data", histSData)
routes.use("/fetch-quote", fetchQuote);
routes.use("/search-symbol", searchSymbol);
routes.use("/stock-details", stockDetails);

module.exports = routes