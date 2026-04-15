import { useState } from "react";
import { motion } from "framer-motion";
import Dropdown from "../../components/NEW/dropdown";
import BaseLayout from "../../layouts/BaseLayout";
const ExpenseSharingCalculator = () => {
	const [itemName, setItemName] = useState("");
	const [totalAmount, setTotalAmount] = useState("");
	const [numPeople, setNumPeople] = useState("");
	const [people, setPeople] = useState([]);
	const [payerIndex, setPayerIndex] = useState("");
	const [results, setResults] = useState(null);

	const generateInputs = () => {
		const num = parseInt(numPeople);
		if (isNaN(num) || num <= 0) {
			alert("Please enter a valid number of people");
			return;
		}
		setPeople(
			Array.from({ length: num }, (_, i) => ({
				name: `Person ${i + 1}`,
				share: 1,
			}))
		);
	};

	const updatePerson = (index, field, value) => {
		const newPeople = [...people];
		newPeople[index][field] = value;
		setPeople(newPeople);
	};

	const calculateShares = () => {
		if (!itemName || isNaN(parseFloat(totalAmount)) || people.length === 0) {
			alert("Please enter valid information for all fields");
			return;
		}

		const total = parseFloat(totalAmount);
		const totalShares = people.reduce((sum, person) => sum + person.share, 0);
		const calculatedPeople = people.map((person) => ({
			...person,
			owes: (person.share / totalShares) * total,
			paid: person.name === payerIndex ? total : 0,
		}));

		const payer =
			calculatedPeople[
				calculatedPeople.findIndex((person) => person.name === payerIndex)
			];
		const debts = calculatedPeople.map((person) => ({
			...person,
			debt: person.owes - (person.paid > 0 ? person.owes : 0),
		}));

		console.log(calculatedPeople, payer, debts);
		setResults({ calculatedPeople, payer, debts });
	};

	const fadeInVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<BaseLayout>
			<div className='max-w-3xl mx-auto mt-20 px-6 pb-6'>
				<motion.div
					className='bg-white p-8 rounded-lg shadow-md'
					initial='hidden'
					animate='visible'
					variants={fadeInVariants}
				>
					<motion.h1
						className='text-3xl font-bold text-center text-blue-600 mb-6'
						variants={fadeInVariants}
					>
						Advanced Expense Sharing Calculator
					</motion.h1>
					<motion.div variants={fadeInVariants} className='my-4'>
						<input
							type='text'
							className='w-full p-2 mb-4 border rounded'
							placeholder='Name of item/expense'
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>
						<input
							type='number'
							className='w-full p-2 mb-4 border rounded'
							placeholder='Total amount'
							value={totalAmount}
							onChange={(e) => setTotalAmount(e.target.value)}
						/>
						<input
							type='number'
							className='w-full p-2 mb-4 border rounded'
							placeholder='Number of people'
							value={numPeople}
							onChange={(e) => setNumPeople(e.target.value)}
						/>
						<button className='btn' onClick={generateInputs}>
							Add People
						</button>
					</motion.div>

					{people.length > 0 && (
						<motion.div variants={fadeInVariants} className='mt-6'>
							<h3 className='text-xl font-semibold text-blue-600 mb-4'>
								Share of Item/Expense
							</h3>
							{people.map((person, index) => (
								<div
									key={index}
									className='flex justify-between items-center mb-4'
								>
									<input
										type='text'
										className='w-1/2 p-2 border rounded mr-2'
										value={person.name}
										onChange={(e) =>
											updatePerson(index, "name", e.target.value)
										}
									/>
									<input
										type='number'
										className='w-1/2 p-2 border rounded'
										placeholder='Share (e.g., 1 for equal split)'
										defaultValue='1'
										onChange={(e) =>
											updatePerson(
												index,
												"share",
												parseFloat(e.target.value) || 1
											)
										}
									/>
								</div>
							))}
						</motion.div>
					)}

					{people.length > 0 && (
						<motion.div variants={fadeInVariants} className='my-6 '>
							<h3 className='text-xl font-semibold text-blue-600 mb-4'>
								Who paid?
							</h3>

							<Dropdown
								title='Select Payer'
								items={people.map((person) => person.name)}
								onSelectOption={setPayerIndex}
							/>
						</motion.div>
					)}

					{payerIndex && (
						<motion.button
							className='btn'
							onClick={calculateShares}
							variants={fadeInVariants}
						>
							Calculate Shares
						</motion.button>
					)}

					{results && (
						<motion.div
							className='mt-8 bg-green-100 p-6 rounded-lg'
							variants={fadeInVariants}
							initial='hidden'
							animate='visible'
						>
							<h2 className='text-2xl font-bold text-green-800 mb-4'>
								Results
							</h2>
							<p className='mb-2'>
								<strong>Item/Expense:</strong> {itemName}
							</p>
							<p className='mb-2'>
								<strong>Total Amount: </strong>
								{parseFloat(totalAmount).toFixed(2)}
							</p>
							<p className='mb-4'>
								<strong>Number of People:</strong> {people.length}
							</p>

							<h3 className='text-xl font-semibold text-green-800 mb-2'>
								Individual Shares:
							</h3>
							{results.calculatedPeople.map((person, index) => (
								<div key={index} className='bg-white p-2 rounded mb-2'>
									{person.name}: {person.owes.toFixed(2)}
								</div>
							))}

							<h3 className='text-xl font-semibold text-green-800 mt-4 mb-2'>
								Who Owes What:
							</h3>
							{results.debts.map(
								(person, index) =>
									person !== results.payer &&
									person.debt > 0 && (
										<div key={index} className='bg-white p-2 rounded mb-2'>
											{person.name} owes {results.payer.name}:
											{' ' + person.debt.toFixed(2)}
										</div>
									)
							)}
						</motion.div>
					)}
				</motion.div>
			</div>
		</BaseLayout>
	);
};

export default ExpenseSharingCalculator;
