const mongoose = require("../../database");

const RivalSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  rivalries: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Rivalry",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// RivalSchema.pre("save", async function (next) {
//   next();
// });

const Rival = mongoose.model("Rival", RivalSchema);
module.exports = Rival;
