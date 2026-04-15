import PropTypes from "prop-types";
import NavBar from "../components/NEW/navigation";
import Background from "../components/NEW/gradient";
import { Suspense } from "react";
import Loader from "../components/NEW/loader";

export default function BaseLayout({ children }) {
	return (
		<Suspense fallback={<Loader/>}>
			<NavBar />
			<Background>
				<div>{children}</div>
			</Background>
		</Suspense>
	);
}

BaseLayout.propTypes = {
	children: PropTypes.element,
};
