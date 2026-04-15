import Card from "../../components/NEW/card";
import { useEffect, useState } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import { YTDetails } from "../../api/yt-api";
import tutorials from "../tutorials.json";

export default function TutorialPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(tutorials.map((x) => YTDetails(x)));
                setData(results);
            } catch (err) {
                setError("Failed to load videos. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <BaseLayout>
            <div className='mt-20 flex flex-col justify-center items-center'>
                {loading && (
                    <p className='text-xl text-gray-500 mt-10'>Loading videos...</p>
                )}
                {error && (
                    <p className='text-xl text-red-500 mt-10'>{error}</p>
                )}
                {data.map((x, i) => (
                    <div key={i} className='w-2/3 m-5 h-1/4 rounded-2xl shadow-md px-4'>
                        <Card
                            icon={<img src={x.videoThumb} className='pr-10' />}
                            title={x.videoTitle}
                            description={x.channelName}
                            btnText='Watch'
                            btnTo={x.videoLink}
                        />
                    </div>
                ))}
            </div>
        </BaseLayout>
    );
}