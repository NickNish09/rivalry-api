const express = require("express");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const Rival = require("../models/rival");
const Rivalry = require("../models/rivalry");

router.use(authMiddleware);

//index
router.get("/", async (req, res) => {
  try {
    const rivalries = await Rivalry.find().populate("user");

    return res.send({ rivalries });
  } catch (err) {
    res.status(400).send({ error: "Error at listing rivalries" });
  }
});

//show
router.get("/:rivalryId", async (req, res) => {
  try {
    const rivalry = await Rivalry.findById(req.params.rivalryId)
      .populate({ path: "user", select: "name _id email" })
      .populate({ path: "rivals", select: "name about" });

    return res.send({ rivalry });
  } catch (err) {
    res.status(400).send({ error: "Error at listing rivalry" });
  }
});

//create
router.post("/", async (req, res) => {
  try {
    const { title, about, rivals } = req.body;
    const rivalry = await Rivalry.create({
      title,
      about,
      user: req.userId,
    });

    await Promise.all(
      rivals.map(async (rival) => {
        const envolvedRival = new Rival({ ...rival });

        envolvedRival.rivalries.push(rivalry);
        await envolvedRival.save();
        rivalry.rivals.push(envolvedRival);
      })
    );

    await rivalry.save();

    return res.send({ rivalry });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Error creating a new rivalry. Try again." });
  }
});

//update
router.put("/:rivalryId", async (req, res) => {
  res.send({ user: req.userId });
});

//delete
router.delete("/:rivalryId", async (req, res) => {
  try {
    await Rivalry.findByIdAndRemove(req.params.rivalryId);

    return res.send({ msg: "Rivalry deleted" });
  } catch (err) {
    res.status(400).send({ error: "Error at deleting rivalry" });
  }
});

module.exports = (app) => app.use("/rivalries", router);
