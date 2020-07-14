const { API_VERSION } = require("../../config/constants");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const Rival = require("../models/rival");
const Rivalry = require("../models/rivalry");
const Comment = require("../models/comment");

// has liked rivalry
router.get("/hasLikedRivalry/:rivalryId", authMiddleware, async (req, res) => {
  try {
    const rivalry = await Rivalry.findById(req.params.rivalryId);

    console.log(rivalry.likes);
    console.log(req.userId);
    if (rivalry.likes.includes(req.userId)) {
      return res.send({ hasLiked: true });
    }

    return res.send({ hasLiked: false });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: `Error checking like status.` });
  }
});

module.exports = (app) => app.use(`/${API_VERSION}/likes`, router);
