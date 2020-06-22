import User from "../../models/user.model";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import dotenv from "dotenv";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});

//import transporter from "../helpers/accountActivationMailer";
const { errorHandler } = require("../../helpers/dbErrorHandling");

const registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
    User.findOne({
      email,
    })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            error: "Email is taken",
          });
        } else {
          // Converting payload to jsonwebtoken.
          const token = jwt.sign(
            {
              name,
              email,
              password,
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
              expiresIn: "5m",
            }
          );

          res.json({
            message: "Activation Link SuccessFully Sent",
            activationLink: `${process.env.CLIENT_URL}/user/activate/${token}`,
          });
          /*
          // Using Mailgun
          const mg = mailgun({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.DOMAIN,
          });
          const data = {
            from: `"Amazon Clone" ${process.env.EMAIL}`,
            to: email,
            subject: "Account activation link",
            body: "Thank you for choosing us !",
            html: `
                      <h1>Please click the following link to activate your amazon clone account</h1>
                      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                      <hr />
                      <p>This email may contain sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                       `,
          };
          mg.messages().send(data, (error, body) => {
            if (body) {
              res.status(200).json({
                success: true,
                message: `Email has been sent to ${email} to activate your account`,
              });
            }
            if (error) {
              res.status(400).json({
                success: false,
                error: "Something went wrong with mailgun !",
              });
            }
          });
          */

          // Using node mailer.
          /*
              let mailOptions = {
                from: `"Amazon Clone" ${process.env.EMAIL}`,
                to: email,
                subject: "Account activation link",
                body: "Thank you for choosing us !",
                html: `
                      <h1>Please click the following link to activate your amazon clone account</h1>
                      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                      <hr />
                      <p>This email may contain sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                       `,
              };
              // Sending email with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  res.status(400).json({
                    success: false,
                    error: errorHandler(error),
                  });
                } else {
                  console.log(info.response)
                  res.status(200).json({
                    success: true,
                    message: `Email has been sent to ${email}`,
                  });
                }
              });
              */
        }
      })
      .catch((error) => {
        if (error) {
          return res.json({
            error: errorHandler(err),
          });
        }
      });
  }
};

export default registerController;
