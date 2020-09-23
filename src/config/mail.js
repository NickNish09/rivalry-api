module.exports = {
  host: "smtp.sendgrid.net",
  port: 2525,
  auth: {
    user: process.env.USER_SMTP_DEV,
    pass: process.env.PASS_SMTP_DEV,
  },
};
