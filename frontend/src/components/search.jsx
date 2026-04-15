import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Component } from "react";
import { searchSymbol } from "../api/stock-api";
import SearchResults from "./searchresults";

class Search extends Component {


	constructor(props) {
		super(props);
		this.state = {
			input: "",
			bestMatches: [],
		};
	}

	updateBestMatches = async () => {
		const { input } = this.state;
		try {
			if (input) {
				const searchResults = await searchSymbol(input);
				const result = searchResults.result;
				this.setState({ bestMatches: result });
			}
		} catch (error) {
			this.setState({ bestMatches: [] });
			console.log(error);
		}
	};

	clear = () => {
		this.setState({ input: "", bestMatches: [] });
	};

	handleInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	handleKeyPress = (event) => {
		if (event.key === "Enter") {
			this.updateBestMatches();
		}
	};

	render() {
		const { input, bestMatches } = this.state;

		return (
			<div
				className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${
					"bg-white border-neutral-200"
				}`}
			>
				<input
					type='text'
					value={input}
					className={`w-full px-4 py-2 focus:outline-none rounded-md ${
						null
					}`}
					placeholder='Search stock...'
					onChange={this.handleInputChange}
					onKeyUp={this.handleKeyPress}
				/>
				{input && (
					<button onClick={this.clear} className='m-1'>
						<XMarkIcon className='h-4 w-4 fill-gray-500' />
					</button>
				)}
				<button
					onClick={this.updateBestMatches}
					className='btn transition duration-300 hover:ring-2 ring-indigo-400 mx-4'
				>
					<MagnifyingGlassIcon className='h-4 w-4 fill-gray-100' />
				</button>
				{input && bestMatches.length > 0 ? (
					<SearchResults results={bestMatches} onSelect={this.clear} />
				) : null}
			</div>
		);
	}
}

export default Search;
