import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash } from "grommet-icons";
import BaseLayout from "../../layouts/BaseLayout";


const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6 },
};

function Budget() {
	const [totalAmount, setTotalAmount] = useState(0);
	const [userAmount, setUserAmount] = useState("");
	const [productTitle, setProductTitle] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [productTitleError, setProductTitleError] = useState("");
	const [expenditureValue, setExpenditureValue] = useState(0);
	const [balanceValue, setBalanceValue] = useState(0);
	const [list, setList] = useState([]);

	const handleSetBudget = () => {
		if (totalAmount === "" || totalAmount < 0) {
			setErrorMessage("Value cannot be empty or negative");
		} else {
			setErrorMessage("");
			setBalanceValue(totalAmount - expenditureValue);
		}
	};

	const handleAddExpense = () => {
		if (!userAmount || !productTitle) {
			setProductTitleError("Values cannot be empty");
			return;
		}
		const newExpense = parseInt(userAmount);
		const newExpenditureValue = expenditureValue + newExpense;
		const newBalanceValue = totalAmount - newExpenditureValue;

		const newExpenseItem = {
			title: productTitle,
			amount: newExpense,
		};

		setList([...list, newExpenseItem]);
		setExpenditureValue(newExpenditureValue);
		setBalanceValue(newBalanceValue);
		setProductTitle("");
		setUserAmount("");
	};

	const handleModifyExpense = (index, edit = false) => {
		const expenseToModify = list[index];
		const newBalanceValue = balanceValue + expenseToModify.amount;
		const newExpenditureValue = expenditureValue - expenseToModify.amount;

		setList(list.filter((_, i) => i !== index));
		setBalanceValue(newBalanceValue);
		setExpenditureValue(newExpenditureValue);

		if (edit) {
			setProductTitle(expenseToModify.title);
			setUserAmount(expenseToModify.amount);
		}
	};


	return (
		<BaseLayout>
			<motion.div
				className='w-11/12 max-w-screen-md mx-auto  text-base mt-20'
				initial='initial'
				animate='animate'
				variants={fadeInUp}
			>
				<motion.div className='w-full grid gap-4' variants={fadeInUp}>
					<motion.div
						className='bg-white p-5 rounded-md shadow-md'
						variants={fadeInUp}
					>
						<h3 className='text-3xl font-bold mb-4 text-gray-900'>Budget</h3>
						<p className={`${errorMessage ? "" : "hidden"} text-red-500 mb-2`}>
							{errorMessage}
						</p>
						<input
							type='number'
							className='block w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-blue-500 mb-2'
							placeholder='Enter Budget'
							value={totalAmount}
							onChange={(e) => setTotalAmount(parseInt(e.target.value))}
						/>
						<motion.button
							className='btn transition-colors duration-300'
							onClick={handleSetBudget}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Set Budget
						</motion.button>
					</motion.div>

					<motion.div
						className='bg-white p-5 rounded-md shadow-md'
						variants={fadeInUp}
					>
						<h3 className='text-3xl font-bold mb-4 text-gray-900'>Expenses</h3>
						<p
							className={`${
								productTitleError ? "" : "hidden"
							} text-red-500 mb-2`}
						>
							{productTitleError}
						</p>
						<input
							type='text'
							className='block w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-blue-500 mb-2'
							placeholder='Enter Title of Product'
							value={productTitle}
							onChange={(e) => setProductTitle(e.target.value)}
						/>
						<input
							type='number'
							className='block w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-blue-500 mb-2'
							placeholder='Enter Cost of Product'
							value={userAmount}
							onChange={(e) => setUserAmount(e.target.value)}
						/>
						<motion.button
							className='btn transition-colors duration-300'
							onClick={handleAddExpense}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Check Amount
						</motion.button>
					</motion.div>

					<motion.div
						className='bg-gray-900 text-white rounded-md shadow-md p-5 flex justify-between items-center'
						variants={fadeInUp}
					>
						<div>
							<p className='font-medium mb-2'>Total Budget</p>
							<span
								id='amount'
								className='block text-center font-normal text-gray-300'
							>
								{totalAmount}
							</span>
						</div>
						<div>
							<p className='font-medium mb-2'>Expenses</p>
							<span
								id='expenditure-value'
								className='block text-center font-normal text-gray-300'
							>
								{expenditureValue}
							</span>
						</div>
						<div>
							<p className='font-medium mb-2'>Balance</p>
							<span
								id='balance-amount'
								className='block text-center font-normal text-gray-300'
							>
								{balanceValue}
							</span>
						</div>
					</motion.div>

					<motion.div
						className='bg-white p-5 rounded-lg shadow-md'
						variants={fadeInUp}
					>
						<h3 className='text-3xl font-bold mb-4 text-gray-900'>
							Expense List
						</h3>
						<motion.div className='space-y-4' id='list'>
							{list.map((item, index) => (
								<motion.div
									key={index}
									className='grid grid-cols-3 items-center space-x-4 border-l-4 border-gray-900 p-4'
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3 }}
								>
									<p className='font-medium text-gray-800'>{item.title}</p>
									<p className='text-gray-700'>{item.amount}</p>
									<div className='flex space-x-4 justify-end'>
										<motion.button
											className='text-gray-900 hover:text-gray-700'
											style={{ fontSize: "1.2em" }}
											onClick={() => handleModifyExpense(index, true)}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<Edit />
										</motion.button>
										<motion.button
											className='text-gray-900 hover:text-gray-700'
											style={{ fontSize: "1.2em" }}
											onClick={() => handleModifyExpense(index)}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<Trash />
										</motion.button>
									</div>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
        </BaseLayout>
		
	);
}

export default Budget;
