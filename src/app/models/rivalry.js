const mongoose = require("../../database");

function rivalsCount(val) {
  console.log("valor");
  console.log(val);
  return val.length >= 2;
}

const RivalrySchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  about: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  rivals: {
    type: [
      {
        rival: { type: mongoose.Schema.Types.ObjectID, ref: "Rival" },
        stars: { type: Number, default: 0 },
        starsUserIds: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
      },
    ],
    validate: [rivalsCount, "The rivalry should envolve at least 2 rivals"],
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Tag",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// RivalrySchema.pre("save", async function (next) {
//   next();
// });

const Rivalry = mongoose.model("Rivalry", RivalrySchema);
module.exports = Rivalry;
