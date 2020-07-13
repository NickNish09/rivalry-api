const mongoose = require("../../database");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

TagSchema.pre("save", async function (next) {
  this.name = this.name.toLowerCase(); //lowercase all tags
  next();
});

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
