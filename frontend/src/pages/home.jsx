
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/NEW/headerx";
import Features from "../components/NEW/features";
import Footer from "../components/NEW/footer";
import Pivot from "../components/NEW/pivot";
import { useRef } from "react";
export default function Home() {

	const ref = useRef(null);
	const handleSroll = () => {
		ref.current.scrollIntoView({behavior: 'smooth'})
	}
	return (
		<BaseLayout>
			<div className='flex flex-col '>
				<Header toScroll={handleSroll}/>
				<div className='mt-16' ref={ref}>
					<Features />
				</div>
				<Pivot />
				<Footer />
			</div>
		</BaseLayout>
	);
}
