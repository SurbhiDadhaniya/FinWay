
import { motion } from "framer-motion";

const Pivot = () => {
	return (
		<section className='py-20'>
			<motion.div
				className='container mx-auto text-center'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<motion.h2
					className='text-5xl font-bold mb-8 text-gray-900'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					Sign up today.
				</motion.h2>
				<motion.button
					className='btn transition-colors duration-300'
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Get Started
				</motion.button>
			</motion.div>
		</section>
	);
};

export default Pivot;
