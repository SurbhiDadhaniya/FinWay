import PropTypes from "prop-types"
import { Component } from "react";
import Card from "./stock-card";

class Overview extends Component {
	render() {
		const { symbol, price, change, changePercent, currency } = this.props;
		console.log(this.props)
		return (
			<Card>
				<span className='absolute left-2 top-1 text-neutral-400 font-semibold text-md xl:text-lg 2xl:text-2xl'>
					{symbol}
				</span>
				<div className='w-full h-full flex items-center justify-around'>
					<span className='text-2xl xl:text-3xl 2xl:text-5xl font-semibold flex items-center'>
						${price}
						<span className='text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2'>
							{currency}
						</span>
					</span>
					<span
						className={`text-lg xl:text-xl 2xl:text-2xl ${
							change > 0 ? "text-lime-500" : "text-red-500"
						}`}
					>
						{change} <span>({changePercent}%)</span>
					</span>
				</div>
			</Card>
		);
	}
}

Overview.propTypes = {
  change: PropTypes.number,
  changePercent: PropTypes.number,
  currency: PropTypes.string,
  price: PropTypes.number,
  symbol: PropTypes.string
}

export default Overview;

