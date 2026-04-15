import { Component } from "react";
import Card from "./stock-card";
import StockContext from "../context/StockContext";
import PropTypes from "prop-types";

class Details extends Component {
	static contextType = StockContext;

	shouldComponentUpdate(nextProps) {
		return this.props !== nextProps;
	}

	convertMillionToBillion = (number) => {
		return (number / 1000).toFixed(2);
	};

	render() {
		const { details } = this.props;

		const detailslist = {
			name: "Name",
			country: "Country",
			currency: "Currency",
			exchange: "Exchange",
			ipo: "IPO Date",
			marketCapitalization: "Market Capitalization",
			finnhubIndustry: "Industry",
		};

		return (
			<Card>
				<ul
					className={`w-full h-full flex flex-col justify-between divide-y ${"divide-gray-200"}`}
				>
					{Object.keys(detailslist).map((item) => (
						<li
							key={item}
							className='flex-1 flex justify-between items-center p-2'
						>
							<span>{detailslist[item]}</span>
							<span className='font-bold'>
								{item === "marketCapitalization"
									? `${this.convertMillionToBillion(details[item])}B`
									: details[item]}
							</span>
						</li>
					))}
				</ul>
			</Card>
		);
	}
}

export default Details;

Details.propTypes = {
	details: PropTypes.object,
};
