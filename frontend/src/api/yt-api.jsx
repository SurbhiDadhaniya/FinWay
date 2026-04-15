import axios from "axios";

/**
 * Fetches details of a YouTube video using the provided query.
 *
 * @param {string} query - The query string used to search for the YouTube video.
 * @return {Promise<object>} A Promise that resolves to the response data containing the YouTube video details.
 */
export const YTDetails = async (query) => {
    const response = await axios({
			method: "post",
			url: `${import.meta.env.VITE_API_BASE}/api/yt-details/`,
			data: {
				link: query,
			},
		});
        
    return response.data
}