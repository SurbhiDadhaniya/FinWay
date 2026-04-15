import Home from './pages/home'
import { Route, Routes } from 'react-router-dom';
import Budget from './pages/new/budget';
import CurrencyConverter from './pages/new/converter';
import StockChart from './pages/stock-chart';
import TutorialPage from './pages/new/edu';
import SignUpPage from './pages/new/sign-up';
import ExpenseSharingCalculator from './pages/new/splitwise';

function App() {

	return (
		<div>
			<Routes>
				<Route path='/' element={<Home/>}></Route>
				<Route path='/budget-tracker' element={<Budget/>}></Route>
				<Route path="/currency-converter" element={<CurrencyConverter/>}></Route>
				<Route path='/stock-chart' element={<StockChart/>}/>
				<Route path='/tutorial' element={<TutorialPage/>}/>
				<Route path='/signup' element={<SignUpPage/>}/>
				<Route path='/splitwise' element={<ExpenseSharingCalculator/>}/>
			</Routes>
		</div>
	);
}

export default App;
