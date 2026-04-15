import FeatureCard from "./card";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "react-lottie";
import anim1 from "../../lotties/Animation - 1722337555404.json";
import fineduanim from "../../lotties/finedu.json";
import currconvanim from "../../lotties/currconv.json";
import stockanim from "../../lotties/stockchart.json";
import splitwiseanim from "../../lotties/splitwise.json";

const Features = () => {
	const headerRef = useRef(null);
	const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

	return (
		<div className='container flex flex-col items-center justify-center mx-auto px-4 py-16  h-auto max-w-[100%]'>
			<motion.h2
				ref={headerRef}
				className='text-6xl font-bold mb-12 text-center'
				initial={{ opacity: 0, y: -50 }}
				animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
				transition={{ duration: 0.5 }}
			>
				Solutions we offer.
			</motion.h2>

			<FeatureCard
				title='Budget Tracker'
				description='A simple tool to manage and monitor your personal finances.'
				icon={
					<Lottie
						options={{ loop: true, autoplay: true, animationData: anim1 }}
					/>
				}
				btnText='Explore'
				btnTo='/budget-tracker'
			/>

			<FeatureCard
				title='Financial Education'
				description='A resource to learn and improve your understanding of money management.'
				icon={
					<Lottie
						options={{ loop: true, autoplay: true, animationData: fineduanim }}
					/>
				}
				btnText='Explore'
				btnTo='/tutorial'
			/>

			<FeatureCard
				title='Currency Converter'
				description='A tool for converting values between different global currencies quickly.'
				icon={
					<Lottie
						options={{
							loop: true,
							autoplay: true,
							animationData: currconvanim,
						}}
					/>
				}
				btnText='Explore'
				btnTo='/currency-converter'
			/>

			<FeatureCard
				title='Live Stock Chart'
				description='A real-time visual representation of stock market prices and trends.'
				icon={
					<Lottie
						options={{ loop: true, autoplay: true, animationData: stockanim }}
					/>
				}
				btnText='Explore'
				btnTo='/stock-chart'
			/>

			<FeatureCard
				title='Advanced Expense Sharing Calculator'
				description='Smart app to split costs fairly among friends and groups.'
				icon={
					<Lottie
						options={{
							loop: true,
							autoplay: true,
							animationData: splitwiseanim,
						}}
					/>
				}
				btnText='Explore'
				btnTo='/splitwise'
			/>
		</div>
	);
};

export default Features;
