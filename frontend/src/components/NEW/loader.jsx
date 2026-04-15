import BaseLayout from "../../layouts/BaseLayout";
import Lottie from "react-lottie";
import anim from "../../lotties/loader.json";

const Loader = () => {
	return (
		<BaseLayout>
			<Lottie
				options={{
					loop: true,
					autoplay: true,
					animationData: anim,
				}}
			/>
		</BaseLayout>
	);
};

export default Loader;
