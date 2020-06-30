const mongoose = require("../../database");

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  rivalry: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Rivalry",
    required: true,
  },
  rival: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Rival",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// CommentSchema.pre("save", async function (next) {
//   next();
// });

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
