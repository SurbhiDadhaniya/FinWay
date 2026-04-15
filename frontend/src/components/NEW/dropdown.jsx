import { Component, createRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

export default class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = { isOpen: false, searchTerm: "", value: "" };
		this.dropdownRef = createRef();
	}

	componentDidMount() {
		document.addEventListener("mouseover", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mouseover", this.handleClickOutside);
	}

	handleClickOutside = (event) => {
		if (
			this.dropdownRef.current &&
			!this.dropdownRef.current.contains(event.target)
		) {
			this.setState({ isOpen: false });
		}
	};

	handleMouseEnter = () => {
		this.setState({ isOpen: true });
	};

	handleSelectValue = (e) => {
		this.setState({ value: e, isOpen: false });
		this.props.onSelectOption(e);
	};

	render() {
		const items = this.props.items;

		return (
			<div
				className='relative'
				ref={this.dropdownRef}
				onMouseEnter={this.handleMouseEnter}
			>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className='btn w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					<span className='block truncate'>
						{this.state.value || this.props.title}
					</span>
				</motion.button>
				<AnimatePresence>
					{this.state.isOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className='absolute z-10 w-full mt-1 bg-black text-white border border-gray-700 rounded-md shadow-lg'
						>
							<div className='max-h-60 overflow-auto'>
								{items.map((item, i) => (
									<motion.div
										key={i}
										whileHover={{ backgroundColor: "#333" }}
										className='px-3 py-2 text-sm cursor-pointer'
										onClick={() => this.handleSelectValue(item)}
									>
										{item}
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	}
}

Dropdown.propTypes = {
	items: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	onSelectOption: PropTypes.func.isRequired,
};
