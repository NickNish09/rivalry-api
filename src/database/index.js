const mongoose = require("mongoose");

if (process.env.NODE_ENV == "development") {
  console.log('local db');
  mongoose.connect("mongodb://localhost:27017/rivalry", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} else {
  mongoose.connect("mongodb://mongo:27017/rivalry", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
mongoose.Promise = global.Promise;

module.exports = mongoose;
