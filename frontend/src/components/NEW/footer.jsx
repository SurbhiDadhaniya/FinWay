

const Footer = () => {
	return (
		<footer className='bg-black text-white py-4 px-6'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='text-sm'>© Finway 2024</div>
				<div className='text-sm'>
					<a
						href='mailto:contact@finway.com'
						className='hover:underline'
					>
						contact@finway.com
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
