const yts = require("yt-search");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
    const { link } = req.body;
    try {
        const videoId = new URL(link).searchParams.get("v");
        const result = await yts({ videoId });

        res.status(200).json({
            channelName: result.author.name,
            videoTitle: result.title,
            videoDesc: result.description || "No Description",
            videoLink: result.url,
            videoThumb: result.thumbnail,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;