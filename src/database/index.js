const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo:27017/rivalry", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// mongoose.connect("mongodb://localhost/rivalry", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
mongoose.Promise = global.Promise;

module.exports = mongoose;
