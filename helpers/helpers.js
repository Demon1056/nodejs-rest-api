require("dotenv").config();
const nodemailer = require("nodemailer");

const { EMAIL_PASS, EMAIL_USER } = process.env;

const tryCatchWrapper = (enpointFn) => {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const throwError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const sendMessage = async ({ to, html, subject }) => {
  const email = {
    from: "contactwebsite@mail.com",
    to,
    subject,
    html,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    await transport.sendMail(email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  tryCatchWrapper,
  throwError,
  sendMessage,
};
