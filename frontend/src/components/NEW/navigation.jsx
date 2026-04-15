import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<nav className='shadow-lg backdrop-blur-sm px-4 pb-2.5 fixed top-0 z-10 w-screen bg-slate-800 bg-opacity-30'>
			<div className='flex flex-row pt-2.5'>
				<div className='flex items-center pl-5 gap-5'>
					
					<span className='h-[2em]'>
						<Link to='/'>
							<img src={logo} className="h-full" />
						</Link>
					</span>

					
					<span className='ml-4 text-lg font-medium text-gray-900'>
						<Link to='/'>Home</Link>
						
					</span>
				</div>
				<div className='ml-auto pr-3 pt-1'>
					<span className=' pr-3'>
						<Link to={`/signup`}>
							<span className='btn'>Log In</span>
						</Link>
					</span>
					<span className='ml-auto pr-5 pt-1'>
						<Link to={`/signup?next=active`}>
							<span className='btn'>Sign Up</span>
						</Link>
					</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
