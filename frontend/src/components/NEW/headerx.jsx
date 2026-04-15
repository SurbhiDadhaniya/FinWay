import { useEffect, useState} from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import anim from "../../lotties/Animation - 1722336488846.json";
import fullLogo from "../../assets/full-logo.png"
import propTypes from "prop-types"
const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const Header = ({toScroll}) => {
	const [isVisible, setIsVisible] = useState(false);

	
	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<header className='w-full min-h-screen flex flex-col items-center text-center p-[100px] '>
			{isVisible && (
				<>
					<motion.h1
						className='relative w-fit h-fit grow font-semibold text-7xl tracking-wide text-gray-900 mb-4'
						{...fadeInUp}
					>
						<img src={fullLogo} className="h-[1.45em]"/>
					</motion.h1>
					<motion.div
						className='relative w-72 mb-4'
						{...fadeInUp}
						transition={{ ...fadeInUp.transition, delay: 0.2 }}
					>
						<Lottie
							options={{
								loop: true,
								autoplay: true,
								animationData: anim,
								rendererSettings: {
									preserveAspectRatio: "xMidYMid slice",
								},
							}}
						/>
					</motion.div>
					<motion.p
						className='text-lg font-semibold text-slate-800 max-w-[400px] mb-4'
						{...fadeInUp}
						transition={{ ...fadeInUp.transition, delay: 0.4 }}
					>
						Your all-in-one financial hub. Track your budget, monitor stocks,
						and split expenses with friends—all in one place. Simplify your
						finances and make smarter money decisions.
					</motion.p>
					<motion.button
						className='btn'
						{...fadeInUp}
						transition={{ ...fadeInUp.transition, delay: 0.6 }}
						onClick={toScroll}
					>
						Learn More
					</motion.button>
				</>
			)}
		</header>
	);
};

Header.propTypes = {
  toScroll: propTypes.func
}

export default Header;
