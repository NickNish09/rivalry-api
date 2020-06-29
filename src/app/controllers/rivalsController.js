const express = require("express");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const Rival = require("../models/rival");

//index
router.get("/", async (req, res) => {
  try {
    const rivals = await Rival.find().populate([
      { path: "rivalries", select: "title about" },
    ]);

    return res.send({ rivals });
  } catch (err) {
    res.status(400).send({ error: "Error at listing rivals" });
  }
});

//show
router.get("/:rivalId", async (req, res) => {
  try {
    const rival = await Rival.findById(req.params.rivalId).populate([
      { path: "rivalries", select: "title about" },
    ]);

    return res.send({ rival });
  } catch (err) {
    res.status(400).send({ error: "Error at listing rival" });
  }
});

//create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, about } = req.body;
    const rival = new Rival({
      name,
      about,
    });

    await rival.save();

    return res.send({ rival });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: `Error creating a new rival.` });
  }
});

//update
router.put("/:rivalId", async (req, res) => {
  try {
    const { name, about } = req.body;
    const rival = await Rival.findByIdAndUpdate(
      req.params.rivalId,
      {
        name,
        about,
      },
      { new: true }
    );

    return res.send({ rival });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Error creating a new rival. Try again." });
  }
});

//delete
router.delete("/:rivalId", async (req, res) => {
  try {
    await Rival.findByIdAndRemove(req.params.rivalId);

    return res.send({ msg: "rival deleted" });
  } catch (err) {
    res.status(400).send({ error: "Error at deleting rival" });
  }
});

module.exports = (app) => app.use("/rivals", router);
