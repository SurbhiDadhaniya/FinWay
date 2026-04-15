import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import PropTypes from "prop-types"



const Card = ({ title, description, icon, btnText, btnTo }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });
	const handleClick = () => {
		console.log(btnTo)
		window.location.href = btnTo;
	}

	return (
		<motion.div
			ref={ref}
			className='relative w-full mb-8 flex flex-col md:flex-row items-center justify-between'
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={
					isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
				}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='w-64 h-[50vh] flex items-center justify-center flex-shrink-0 flex-1'
			>
				{icon}
			</motion.div>
			<div className='flex-grow max-w-2xl'>
				<motion.h3
					className='text-5xl font-semibold mb-4'
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{title}
				</motion.h3>
				<motion.p
					className='text-slate-800 text-xl font-semibold mb-4 w-2/3'
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					{description}
				</motion.p>
				<motion.button
					className='btn flex items-center'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					onClick={() => handleClick()}
				>
					{btnText}
					<svg
						className='w-4 h-4 ml-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</motion.button>
			</div>
		</motion.div>
	);
};

Card.propTypes = {
  btnText: PropTypes.any,
  description: PropTypes.any,
  icon: PropTypes.any,
  title: PropTypes.any,
  btnTo: PropTypes.string
}


export default Card;