const { API_VERSION } = require("../../config/constants");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const Rival = require("../models/rival");
const Rivalry = require("../models/rivalry");
const Comment = require("../models/comment");

//index based on rivalry
router.get("/rivalry/:rivalryId", async (req, res) => {
  try {
    const comments = await Comment.find({
      rivalry: req.params.rivalryId,
    }).populate([{ path: "user", select: "name _id email" }]);

    return res.send({ comments });
  } catch (err) {
    res.status(400).send({ error: "Error at listing rivalries" });
  }
});

//show
router.get("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate([
      { path: "user", select: "name _id email" },
      { path: "rival", select: "name about" },
      { path: "rivalry", select: "title about" },
    ]);

    return res.send({ comment });
  } catch (err) {
    res.status(400).send({ error: "Error at listing comment" });
  }
});

//create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { body, rivalry, rival } = req.body;
    const comment = await Comment.create({
      body,
      rival,
      rivalry,
      user: req.userId,
    });

    return res.send({ comment });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: `Error creating a new comment.` });
  }
});

//update
router.put("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { body } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        body,
      },
      { new: true }
    );

    return res.send({ comment });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error updating comment." });
  }
});

//delete
router.delete("/:commentId", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.user.toString() !== req.userId.toString()) {
      // not the user trying to delete the comment
      return res
        .status(401)
        .send({ error: "You have no permission to delete this comment" });
    }

    await Comment.findByIdAndRemove(req.params.commentId);

    return res.send({ msg: "Comment deleted" });
  } catch (err) {
    res.status(400).send({ error: "Error at deleting comment" });
  }
});

//like a comment
router.post("/like/:commentId", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (comment.likes.includes(req.userId)) {
      //checks if the user already liked, in this case, deslike the comment
      comment.likes = comment.likes.filter(
        (el) => el.toString() !== req.userId.toString()
      );
    } else {
      comment.likes.push(req.userId); //adds the user ID to the likes array of the comment
    }

    await comment.save();
    return res.send({ comment });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error liking comment." });
  }
});

module.exports = (app) => app.use(`/${API_VERSION}/comments`, router);
