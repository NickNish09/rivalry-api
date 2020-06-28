const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const { host, port, auth } = require("../config/mail");
console.log(auth);

var transport = nodemailer.createTransport({
  host,
  port,
  auth,
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve("./src/resources/mail/"),
      layoutsDir: path.resolve("./src/resources/mail/"),
      defaultLayout: undefined,
    },
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

module.exports = transport;
