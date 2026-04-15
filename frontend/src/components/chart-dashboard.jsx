import { useState, useEffect, useContext } from "react";
import Overview from "./overview";
import Details from "./details";
import Chart from "./chart";
import StockContext from "../context/StockContext";
import { fetchStockDetails, fetchQuote } from "../api/stock-api";
import Search from "./search";

const Dashboard = () => {
	const { stockSymbol } = useContext(StockContext);
	const [stockDetails, setStockDetails] = useState({});
	const [quote, setQuote] = useState({});
	
	useEffect(() => {
		const updateStockDetails = async () => {
			try {
				const result = await fetchStockDetails(stockSymbol);
				setStockDetails(result);
			} catch (error) {
				setStockDetails({});
				console.log(error);
			}
		};

		const updateStockOverview = async () => {
			try {
				const result = await fetchQuote(stockSymbol);
				setQuote(result);
			} catch (error) {
				setQuote({});
				console.log(error);
			}
		};

		updateStockDetails();
		updateStockOverview();
	}, [stockSymbol]);

	return (
		<div className='grid grid-cols-3 gap-6 px-6'>
			<div className='col-span-2 row-span-4'>
				<Chart />
			</div>
			<div className="flex justify-center items-center">
				<Search />
			</div>
			<div>
				<Overview
					symbol={stockSymbol}
					price={quote.pc}
					change={quote.d}
					changePercent={quote.dp}
					currency={stockDetails.currency}
				/>
			</div>
			<div>
				<Details details={stockDetails} />
			</div>
		</div>
	);
};

export default Dashboard;
