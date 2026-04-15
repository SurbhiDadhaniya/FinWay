import { Component } from "react";
import PropTypes from "prop-types";
import YTAlt from "../assets/yt-alt-thumb.png";

export default class TCard extends Component {
	static propTypes = {
		channelName: PropTypes.string,
		link: PropTypes.string,
		videoDesc: PropTypes.string,
		videoLink: PropTypes.string,
		videoThumb: PropTypes.any,
		videoTitle: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<>
				<div className='flex mt-5 items-center justify-center'>
					<div className='relative flex w-full max-w-[48rem] flex-row rounded-xl bg-secondary bg-clip-border text-gray-700 shadow-md'>
						<div className='relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-secondary bg-clip-border text-gray-700'>
							<img
								src={this.props.videoThumb || YTAlt}
								alt='image'
								className='h-full w-full object-scale-down bg-transparent'
							/>
						</div>
						<div className='p-6'>
							<div className='flex'>
								<img src={YTAlt} className='h-8 rounded mb-4' />
								<h6 className='mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased'>
									{this.props.channelName || "Channel Name"}
								</h6>
							</div>
							<h4 className='mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased'>
								{this.props.videoTitle || "Video Title"}
							</h4>
							<p className='mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased'>
								{this.props.videoDesc || "Video Description"}
							</p>
							<a className='inline-block' href={this.props.videoLink || "#"}>
								<button
									className='flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
									type='button'
								>
									Watch Now
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='2'
										stroke='currentColor'
										aria-hidden='true'
										className='h-4 w-4'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
										></path>
									</svg>
								</button>
							</a>
						</div>
					</div>
				</div>
			</>
		);
	}
}
