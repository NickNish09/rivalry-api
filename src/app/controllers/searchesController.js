const { API_VERSION } = require("../../config/constants");

const express = require("express");

const router = express.Router();
const Rivalry = require("../models/rivalry");
const Rival = require("../models/rival");

// search for everything
router.get("/", async (req, res) => {
  // let regex = RegExp(`.*^${req.query.q.toLowerCase()}.*`, "i");
  let arrayOfQueries = req.query.q.toLowerCase().split(" ");
  let queryRegex = ".*";
  arrayOfQueries.map((word) => {
    queryRegex += `${word}.*`;
  });

  let regex = new RegExp(queryRegex, "i");
  try {
    const rivals = await Rival.find({
      name: regex,
    });
    const rivalries = await Rivalry.find({
      title: regex,
    }).populate([{ path: "rivals.rival", select: "imageUrl" }]);

    return res.send({ rivals, rivalries });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: `Error at uploading file.` });
  }
});

module.exports = (app) => app.use(`/${API_VERSION}/search`, router);
