module.exports = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER_SMTP_DEV,
    pass: process.env.PASS_SMTP_DEV,
  },
};
