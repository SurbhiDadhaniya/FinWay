import PropTypes from "prop-types"
import { motion } from "framer-motion";

const AnimatedGradientBackground = ({ children }) => {
	return (
		<motion.div
			className='w-full max-h-fit min-h-screen top-0 absolute'
			style={{
				background:
					"linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
				backgroundSize: "400% 400%",
			}}
			animate={{
				backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
			}}
			transition={{
				duration: 15,
				ease: "easeInOut",
				repeat: Infinity,
				repeatType: "reverse",
			}}
		>
			{children}
		</motion.div>
	);
};

AnimatedGradientBackground.propTypes = {
  children: PropTypes.any
}

export default AnimatedGradientBackground;
