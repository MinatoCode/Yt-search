const yts = require("yt-search");

module.exports = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Missing query parameter ?query="
      });
    }

    const results = await yts(query);

    if (!results.videos || results.videos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found"
      });
    }

    // Top 5 results
    const topFive = results.videos.slice(0, 5).map(video => ({
      videoId: video.videoId,
      url: video.url
    }));

    res.json({
      success: true,
      results: topFive
    });

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
    
