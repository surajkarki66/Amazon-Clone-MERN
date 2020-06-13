import User from "../models/user.model";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
import _ from 'lodash';

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});

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
          errors: err,
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        const user = new User({
          name,
          email,
          password,
        });

        user.save((err, user) => {
          if (err) {
            return res.status(401).json({
              success: false,
              errors: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              user: user,
              message: "Successfully Signed Up!",
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: "token is not in the body!",
    });
  }
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

exports.signinController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    // Checking the existence of the user.
    User.findOne({
      email,
    }).exec((err, user) => {
      if (!user) {
        return res.status(400).json({
          errors: "User with that email does not exist. Please signup",
        });
      }
      if (err) {
        return res.json({
          error: "Something went wrong with database.",
        });
      }
      if (user) {
        // Checks users password
        if (!user.authenticate(password)) {
          return res.status(400).json({
            errors: "Email and password do not match",
          });
        } else {
          // Generate a token and send to client
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          const { _id, name, email, role } = user;

          return res.json({
            token,
            user: {
              _id,
              name,
              email,
              role,
            },
          });
        }
      }
    });
  }
};

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (!user) {
          return res.status(400).json({
            error: "User with that email does not exist",
          });
        }
        if (err) {
          return res.json({
            error: "Something wrong with database !",
          });
        }

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

        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              return res.status(400).json({
                error:
                  "Database connection error on user password forgot request",
              });
            } else {
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
          }
        );
      }
    );
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: "Expired link. Try again",
          });
        }

        if (decoded) {
          User.findOne(
            {
              resetPasswordLink,
            },
            (err, user) => {
              if (err || !user) {
                return res.status(400).json({
                  error: "Something went wrong. Try later",
                });
              }
              if (user) {
                const updatedFields = {
                  password: newPassword,
                  resetPasswordLink: "",
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                  if (err) {
                    return res.status(400).json({
                      error: "Error resetting user password",
                    });
                  }
                  if (result) {
                    res.json({
                      message: `Great! Now you can login with your new password`,
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  }
};
