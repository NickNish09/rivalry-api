const mongoose = require("../../database");

const RivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  imageUrl: {
    type: String,
    default:
      "https://instantmockup.herokuapp.com/images/default-placeholder.png",
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
