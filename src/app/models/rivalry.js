const mongoose = require("../../database");

const RivalrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  rivals: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Rival",
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
