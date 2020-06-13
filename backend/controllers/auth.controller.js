import User from "../models/user.model";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";

//import transporter from "../helpers/accountActivationMailer";
const { errorHandler } = require("../helpers/dbErrorHandling");

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      // Checking the existence of the user.
      if (user) {
        return res.status(400).json({
          errors: "Email is taken",
        });
      }
      if (!user && !err) {
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
          if (error) {
            res.status(400).json({
              success: false,
              errors: errorHandler(error),
            });
          } else {
            res.status(200).json({
              success: true,
              message: `Email has been sent to ${email}`,
            });
          }
        });
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
              errors: errorHandler(error),
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
      if (err) {
        return res.json({
          errors: errorHandler(err),
        });
      }
    });
  }
};

exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, _) => {
      if (err) {
        return res.status(401).json({
          errors: "Link is Expired ! Signup again.",
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        const user = new User({
          name,
          email,
          password
        });

        user.save((err, user) => {
          if (err) {
            return res.status(401).json({
              success: false,
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              user: user,
              message: "Successfully Signed Up!"
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: "error happening please try again",
    });
  }
};
