const express = require("express");
const bodyParser = require("body-parser");

// dotenv to set enviroment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/controllers/index")(app);

app.listen(3000);
