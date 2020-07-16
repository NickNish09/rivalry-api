const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// dotenv to set enviroment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log(process.env);

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/controllers/index")(app);

app.listen(3000);
