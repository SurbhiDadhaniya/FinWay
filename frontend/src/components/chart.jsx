import { useContext, useEffect, useState, useCallback } from "react";
import ChartFilter from "./chartfilter";
import { motion } from "framer-motion";
import {
	Area,
	XAxis,
	YAxis,
	ResponsiveContainer,
	AreaChart,
	Tooltip,
} from "recharts";

import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../api/stock-api";
import {
	createDate,
	convertDateToUnixTimestamp,
	convertUnixTimestampToDate,
} from "../helpers/data-helper";
import { chartConfig } from "../constants/config";

const Chart = () => {
	const [filter, setFilter] = useState("1W");
	const [data, setData] = useState([]);
	const { stockSymbol } = useContext(StockContext);

	const formatData = useCallback(
		(data) => {
			return data.c.map((item, index) => {
				return {
					value: item.toFixed(2),
					date: convertUnixTimestampToDate(filter, data.t[index]),
				};
			});
		},
		[filter]
	);

	const getDateRange = useCallback(() => {
		const { days, weeks, months, years } = chartConfig[filter];
		const endDate = new Date();
		const startDate = createDate(endDate, -days, -weeks, -months, -years);
		const startTimestampUnix = convertDateToUnixTimestamp(startDate);
		const endTimestampUnix = convertDateToUnixTimestamp(endDate);
		return { startTimestampUnix, endTimestampUnix };
	}, [filter]);

	const updateChartData = useCallback(async () => {
		try {
			const { startTimestampUnix, endTimestampUnix } = getDateRange();
			const resolution = filter;
			const result = await fetchHistoricalData(
				stockSymbol,
				resolution,
				startTimestampUnix,
				endTimestampUnix
			);
			setData(formatData(result));
		} catch (error) {
			setData([]);
			console.error("Error fetching historical data:", error);
		}
	}, [filter, stockSymbol, getDateRange, formatData]);

	useEffect(() => {
		updateChartData();
	}, [updateChartData]);


	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='w-full rounded-xl relative p-8 bg-gray-900 text-white shadow-md over'
		>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-bold text-white'>Chart</h2>
				<motion.ul className='flex'>
					{Object.keys(chartConfig).map((item) => (
						<motion.li
							key={item}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='mx-1'
						>
							<ChartFilter
								text={item}
								active={filter === item}
								onClick={() => setFilter(item)}
							/>
						</motion.li>
					))}
				</motion.ul>
			</div>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='h-full'
			>
				<ResponsiveContainer width='100%' height={400}>
					<AreaChart data={data}>
						<defs>
							<linearGradient id='chartColor' x1='0' y1='0' x2='0' y2='1'>
								<stop
									offset='5%'
									stopColor='rgb(255, 255, 255)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='rgb(99, 102, 241)'
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<Tooltip
							contentStyle={{
								backgroundColor: "white",
								borderRadius: "4px",
								boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
								color: "#4f46e5",
							}}
							itemStyle={{ color: "#4f46e5" }}
						/>
						<Area
							type='monotone'
							dataKey='value'
							stroke='#4f46e5'
							fill='url(#chartColor)'
							fillOpacity={1}
							strokeWidth={2}
						/>
						<XAxis dataKey='date' />
						<YAxis domain={["dataMin", "dataMax"]} />
					</AreaChart>
				</ResponsiveContainer>
			</motion.div>
		</motion.div>
	);
};

export default Chart;
 