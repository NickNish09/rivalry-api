const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// dotenv to set enviroment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// console.log(process.env);

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/controllers/index")(app);

module.exports = app;