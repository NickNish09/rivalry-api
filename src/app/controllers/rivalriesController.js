const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { API_VERSION } = require("../../config/constants");

const router = express.Router();
const Rival = require("../models/rival");
const Rivalry = require("../models/rivalry");
const Tag = require("../models/tag");

// router.use(authMiddleware);

//index
router.get("/", async (req, res) => {
  try {
    const rivalries = await Rivalry.find().populate([
      { path: "user", select: "name _id email" },
      { path: "rivals", select: "name about" },
      { path: "tags", select: "name" },
    ]);

    return res.send({ rivalries });
  } catch (err) {
    res.status(400).send({ error: "Error at listing rivalries" });
  }
});

//show
router.get("/:rivalryId", async (req, res) => {
  try {
    const rivalry = await Rivalry.findById(req.params.rivalryId).populate([
      { path: "user", select: "name _id email" },
      { path: "rivals", select: "name about" },
      { path: "tags", select: "name" },
    ]);

    return res.send({ rivalry });
  } catch (err) {
    res.status(400).send({ error: "Error at listing rivalry" });
  }
});

//create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, about, rivals, tags } = req.body;
    const rivalry = new Rivalry({
      title,
      about,
      user: req.userId,
    });

    await Promise.all(
      rivals.map(async (rival) => {
        if (typeof rival === "string") {
          // if the rival param is a _id of the rival
          const envolvedRival = await Rival.findById(rival);

          envolvedRival.rivalries.push(rivalry);
          await envolvedRival.save();
          rivalry.rivals.push(envolvedRival);
        } else {
          // if the rival param is a object create the rival and push it to the relation
          const envolvedRival = new Rival({ ...rival });

          envolvedRival.rivalries.push(rivalry);
          await envolvedRival.save();
          rivalry.rivals.push(envolvedRival);
        }
      })
    );

    await Promise.all(
      tags.map(async (tag) => {
        const envolvedTag = await Tag.findOne({ name: tag });
        if (envolvedTag) {
          //found the tag, associate with rivalry
          envolvedTag.rivalries.push(rivalry);
          await envolvedTag.save();
          rivalry.tags.push(envolvedTag);
        } else {
          // create the tag and associate
          const envolvedTag = new Tag({ name: tag });

          envolvedTag.rivalries.push(rivalry);
          await envolvedTag.save();
          rivalry.tags.push(envolvedTag);
        }
      })
    );

    await rivalry.save();

    return res.send({ rivalry });
  } catch (err) {
    let errorMsg = err.errors.rivals.properties.message;
    console.log(err);
    return res
      .status(400)
      .send({ error: `Error creating a new rivalry. ${errorMsg}` });
  }
});

//update
router.put("/:rivalryId", authMiddleware, async (req, res) => {
  try {
    const { title, about, rivals } = req.body;
    const rivalry = await Rivalry.findByIdAndUpdate(
      req.params.rivalryId,
      {
        title,
        about,
      },
      { new: true }
    );

    // await Promise.all(
    //   rivals.map(async (rival) => {
    //     // TODO get rival already created and associate if exists
    //     const envolvedRival = new Rival({ ...rival });
    //
    //     envolvedRival.rivalries.push(rivalry);
    //     await envolvedRival.save();
    //     rivalry.rivals.push(envolvedRival);
    //   })
    // );
    //
    // await rivalry.save();

    return res.send({ rivalry });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Error creating a new rivalry. Try again." });
  }
});

//delete
router.delete("/:rivalryId", authMiddleware, async (req, res) => {
  try {
    await Rivalry.findByIdAndRemove(req.params.rivalryId);

    return res.send({ msg: "Rivalry deleted" });
  } catch (err) {
    res.status(400).send({ error: "Error at deleting rivalry" });
  }
});

//like a rivalry
router.post("/like/:rivalryId", authMiddleware, async (req, res) => {
  try {
    const rivalry = await Rivalry.findById(req.params.rivalryId);

    if (rivalry.likes.includes(req.userId)) {
      //checks if the user already liked, in this case, deslike the rivalry
      rivalry.likes = rivalry.likes.filter(
        (el) => el.toString() !== req.userId.toString()
      );
    } else {
      rivalry.likes.push(req.userId); //adds the user ID to the likes array of the rivalry
    }

    console.log(rivalry);

    await rivalry.save();
    return res.send({ rivalry });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error liking rivalry." });
  }
});

module.exports = (app) => app.use(`/${API_VERSION}/rivalries`, router);
