import User from "../../models/user.model";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import dotenv from "dotenv";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});

const { errorHandler } = require("../../helpers/dbErrorHandling");

const forgetPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            error: "User with that email does not exist",
          });
        }
        if (user) {
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_RESET_PASSWORD,
            {
              expiresIn: "10m",
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
            subject: "Password Reset Link !",
            body: "Thank you for choosing us !",
            html: `
                  <h1>Please click the following link to reset your password !</h1>
                  <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                  <hr />
                  <p>This email may contain sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
                   `,
          };
          return user
            .updateOne({ resetPasswordLink: token })
            .then((success) => {
              if (success) {
                mg.messages().send(data, (error, body) => {
                  if (body) {
                    res.status(200).json({
                      success: true,
                      message: `Email has been sent to ${email}. Follow the instruction to reset your password !`,
                    });
                  }
                  if (error) {
                    res.status(400).json({
                      success: false,
                      errors: errorHandler(error),
                    });
                  }
                });
              }
            })
            .catch((error) => {
              if (error) {
                return res.status(400).json({
                  error:
                    "Database connection error on user password forgot request",
                });
              }
            });
        }
      })
      .catch((error) => {
        return res.json({
          error: "Something wrong with database !",
        });
      });
  }
};

export default forgetPasswordController;
