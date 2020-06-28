const mongoose = require("../../database");

const RivalrySchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    require: true,
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
