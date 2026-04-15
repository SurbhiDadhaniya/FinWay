const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
    const { link } = req.body;
    try {
        const videoId = new URL(link).searchParams.get("v");
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        const video = data.items[0].snippet;
        res.send({
            channelName: video.channelTitle,
            videoTitle: video.title,
            videoDesc: video.description || "No Description",
            videoLink: link,
            videoThumb: video.thumbnails.high.url,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
