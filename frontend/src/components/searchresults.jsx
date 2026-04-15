import { Component } from "react";
import StockContext from "../context/StockContext";

import PropTypes from "prop-types"

class SearchResults extends Component {
	static contextType = StockContext;

	static propTypes = {
		results: PropTypes.array,
		onSelect: PropTypes.func, 
	};

	render() {
		const { results } = this.props;
		const { setStockSymbol } = this.context;

		return (
			<ul
				className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${"bg-white border-neutral-200 custom-scrollbar"}`}
			>
				{results.map((item) => {
					return (
						<li
							key={item.symbol}
							className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${"hover:bg-indigo-200 "} transition duration-300`}
							onClick={() => {
								setStockSymbol(item.symbol);
								this.props.onSelect();
							}}
						>
							<span>{item.symbol}</span>
							<span>{item.description}</span>
						</li>
					);
				})}
			</ul>
		);
	}
}


export default SearchResults;

