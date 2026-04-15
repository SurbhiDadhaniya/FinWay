import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CurrencyCodes from "../currency-codes.json";
import Dropdown from "../../components/NEW/dropdown";
import axios from "axios";
import BaseLayout from "../../layouts/BaseLayout";

export default function CurrencyConverter() {
	const [amount, setAmount] = useState(100);
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("INR");
	const [exchangeRate, setExchangeRate] = useState({});
	const [result, setResult] = useState(0);

	useEffect(() => {
		axios({
			method: "get",
			baseURL: "https://api.freecurrencyapi.com/v1/latest",
			responseType: "json",
			params: {
				apikey: import.meta.env.VITE_API_KEY,
				base_currency: fromCurrency.toUpperCase(),
			},
		})
			.then((response) => {
				setExchangeRate(response.data.data);
			})
			.catch((e) => console.log(e));
	}, [fromCurrency]);

	const convertCurrency = () => {
		const fromExchangeRate = exchangeRate[fromCurrency];
		const toExchangeRate = exchangeRate[toCurrency];
		const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
		setResult(
			`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
		);
	};

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
	};

	const handleFromCurrencyChange = (e) => {
		setFromCurrency(e);
	};

	const handleToCurrencyChange = (e) => {
		setToCurrency(e);
	};

	return (
		<BaseLayout>
			<div className='flex justify-center items-center min-h-screen'>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='w-11/12 max-w-xs bg-white rounded-lg shadow-xl p-6'
				>
					<h1 className='text-2xl font-bold mb-6'>Currency Converter</h1>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						<input
							type='number'
							value={amount}
							onChange={handleAmountChange}
							className='w-full p-2 mb-4 border border-gray-300 rounded'
							placeholder='Enter amount'
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='flex gap-4 flex-row *:basis-1/2 mb-4'
					>
						<Dropdown
							items={CurrencyCodes}
							title='From'
							onSelectOption={handleFromCurrencyChange}
						/>
						<Dropdown
							items={CurrencyCodes}
							title='To'
							onSelectOption={handleToCurrencyChange}
						/>
					</motion.div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={convertCurrency}
						className='btn w-full'
					>
						Convert
					</motion.button>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='mt-6 p-4 bg-gray-100 rounded-md w-full'
					>
						<p className='text-xl font-semibold text-center'>{result}</p>
					</motion.div>
				</motion.div>
			</div>
		</BaseLayout>
	);
}
