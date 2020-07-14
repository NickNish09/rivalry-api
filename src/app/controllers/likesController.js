const { API_VERSION } = require("../../config/constants");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const Rival = require("../models/rival");
const Rivalry = require("../models/rivalry");
const Comment = require("../models/comment");

const destarRival = (rival, userId) => {
  rival.stars -= 1;
  rival.starsUserIds.splice(rival.starsUserIds.indexOf(userId), 1); // remove the userId from starsUserIds array

  return rival;
};

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

router.post("/starRival", authMiddleware, async (req, res) => {
  try {
    const { rivalryId, rivalId } = req.body;
    const rivalry = await Rivalry.findById(rivalryId);

    // find the rival beeing stared or destared
    let rivalInRivalry = rivalry.rivals.filter(
      (rival) => rival.rival.toString() === rivalId.toString()
    )[0];

    // if the user has already stared, destar
    if (rivalInRivalry.starsUserIds.includes(req.userId)) {
      destarRival(rivalInRivalry, req.userId);
    } else {
      // otherwise add 1 to star count and save the userId on array of starsUserIds
      rivalInRivalry.stars += 1;
      rivalInRivalry.starsUserIds.push(req.userId);

      // has to destar all other rivals (can only choose one in the rivalry)
      // find the rivals to destar
      let rivalsToDestar = rivalry.rivals.filter(
        (rival) => rival.rival.toString() !== rivalId.toString()
      );
      rivalsToDestar.map((rival) => {
        // if the user has stared one of the rivals, destar it
        if (rival.starsUserIds.includes(req.userId)) {
          destarRival(rival, req.userId);
        }
      });
    }

    await rivalry.save();

    if (rivalry.likes.includes(req.userId)) {
      return res.send({ starIndex: 0 });
    }

    return res.send({ starIndex: 1 });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: `Error checking like status.` });
  }
});

module.exports = (app) => app.use(`/${API_VERSION}/likes`, router);
