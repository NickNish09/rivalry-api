const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { API_VERSION } = require("../../config/constants");
const router = express.Router();

//create
router.post("/", async (req, res) => {
  try {
    // const { name, about } = req.body;
    console.log(req);

    return res.send({ msg: "" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: `Error at uploading file.` });
  }
});

//update
router.put("/:fileId", async (req, res) => {
  try {
    return res.send({ msg: "oi" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error at updating storage." });
  }
});

module.exports = (app) => app.use(`/${API_VERSION}/uploads`, router);
