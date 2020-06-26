import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import _ from "lodash";
import expressJwt from "express-jwt";

import User from "../../models/user.model";
import { getToken } from "../../middlewares/utils";
dotenv.config({
  path: "./configs/configs.env",
});

const { errorHandler } = require("../../helpers/dbErrorHandling");

const registerController = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  } else {
    User.findOne({
      email,
    })
      .then((user) => {
        if (user) {
          return res.status(422).json({
            error: "Email is already taken.",
          });
        } else {
          const user = new User({
            firstName,
            lastName,
            email,
            password,
          });
          user.save().then((user) => {
            if (user) {
              const userId = user._id;
              const token = jwt.sign(
                {
                  userId,
                  firstName,
                  lastName,
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
              console.log(token);
              mg.messages().send(data, (error, body) => {
                if (body) {
                  res.status(200).json({
                    success: true,
                    message: `Email has been sent to ${email} to activate your account`,
                  });
                }
                if (error) {
                  res.status(500).json({
                    success: false,
                    error: "Something went wrong with mailgun !",
                  });
                }
              });
            }
          });
        }
      })
      .catch((error) => {
        return res.json({
          error: errorHandler(error),
        });
      });
  }
};

const activationController = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          error: "Expired link. Signup again",
        });
      } else {
        const { userId } = jwt.decode(token);
        User.findById(userId)
          .then((user) => {
            user.isActive = true;

            user.save((err, user) => {
              if (err) {
                return res.status(500).json({
                  error: errorHandler(err),
                });
              } else {
                return res.status(201).json({
                  user: user,
                  message: "Account is activated.",
                });
              }
            });
          })
          .catch((error) => {
            return res.json({
              error: errorHandler(error),
            });
          });
      }
    });
  } else {
    return res.status(400).json({
      message: "There is no token in the request body.",
    });
  }
};

const signinController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(500).json({
      error: firstError,
    });
  } else {
    // Checking the existence of the user.
    User.findOne({
      email,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: "User with that email does not exist. Please signup",
          });
        }
        if (user) {
          // Checks users password
          if (!user.authenticate(password)) {
            return res.status(400).json({
              error: "Email and password do not match",
            });
          } else {
            // Generate a token and send to client
            const token = jwt.sign(
              {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "7d",
              }
            );
            const { _id, firstName, lastName, email, role, isActive } = user;

            return res.status(200).json({
              _id,
              firstName,
              lastName,
              email,
              role,
              isActive,
              token,
            });
          }
        }
      })
      .catch((error) => {
        return res.json({
          error: errorHandler(error),
        });
      });
  }
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

const forgetPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(500).json({
      error: firstError,
    });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
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
          console.log(token);
          /*
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
          */
          return user
            .updateOne({ resetPasswordLink: token })
            .then((success) => {
              if (success) {
                return res.status(200).json({
                  message: "Reset password link is sent to your email.",
                });
                /*
                mg.messages().send(data, (error, body) => {
                  if (body) {
                    res.json({
                      success: true,
                      message: `Email has been sent to ${email}. Follow the instruction to reset your password !`,
                    });
                  }
                  if (error) {
                    res.json({
                      success: false,
                      errors: errorHandler(error),
                    });
                  }
                });
                */
              }
            })
            .catch((error) => {
              if (error) {
                return res.json({
                  error: errorHandler(error),
                });
              }
            });
        }
      })
      .catch((error) => {
        return res.json({
          error: errorHandler(error),
        });
      });
  }
};

const resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(500).json({
      error: firstError,
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
          User.findOne({
            resetPasswordLink,
          })
            .then((user) => {
              if (!user) {
                return res.status(404).json({
                  error: "Something went wrong. Try later",
                });
              }
              if (user) {
                const updatedFields = {
                  password: newPassword,
                  resetPasswordLink: "",
                };
                user = _.extend(user, updatedFields);
                user
                  .save()
                  .then((result) => {
                    if (result) {
                      return res.status(200).json({
                        message: `Great! Now you can login with your new password`,
                      });
                    }
                  })
                  .catch((error) => {
                    return res.json({
                      error: errorHandler(error),
                    });
                  });
              }
            })
            .catch((error) => {
              return res.json({
                error: errorHandler(error),
              });
            });
        }
      });
    }
  }
};

const facebookController = (req, res) => {
  const { userID, accessToken } = req.body;
  const url = `https://graph.facebook.com/v7.0/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      User.findOne({ email })
        .then((user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user
              .save()
              .then((data) => {
                if (data) {
                  const token = jwt.sign(
                    { _id: data._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                  );
                  const { _id, email, name, role } = data;
                  return res.staus(201).json({
                    token,
                    user: { _id, email, name, role },
                  });
                }
              })
              .catch((err) => {
                return res.json({
                  error: "User signup failed with facebook",
                });
              });
          }
        })
        .catch((error) => {
          return res.json({
            error: errorHandler(error),
          });
        });
    })
    .catch((error) => {
      res.json({
        error: "Facebook login failed. Try later",
      });
    });
};

const profileChangeController = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    if (firstName && lastName && email && password) {
      if (
        firstName.length >= 5 &&
        lastName.length >= 5 &&
        password.length >= 8
      ) {
        const token = jwt.sign(
          {
            userId,
            firstName,
            lastName,
            email,
            password,
          },
          process.env.JWT_PROFILE_UPDATION,
          {
            expiresIn: "5m",
          }
        );
        console.log(token);
        res.status(200).json({
          message: "Profile Updation Link Sent",
          updationLink: `${process.env.CLIENT_URL}/profile/confirm/${token}`,
        });
      } else {
        return res.status(400).json({
          message: "Credential doesnot match",
        });
      }
    } else {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
};

const profileUpdationConfirmController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_PROFILE_UPDATION, (err, _) => {
      if (err) {
        return res.status(400).json({
          error: "Token is expired.",
        });
      } else {
        const { userId, firstName, lastName, email, password } = jwt.decode(
          token
        );
        User.findById(userId)
          .then((user) => {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;

            user
              .save()
              .then((user) => {
                return res.json({
                  _id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  role: user.role,
                  isActive: user.isActive,
                  token: getToken(user),
                });
              })
              .catch((error) => {
                res.json({ error: errorHandler(error) });
              });
          })
          .catch((error) => {
            res.json({ error: errorHandler(error) });
          });
      }
    });
  } else {
    res.json({
      message: "token is not in the body!",
    });
  }
};

export {
  registerController,
  activationController,
  signinController,
  requireSignin,
  forgetPasswordController,
  resetPasswordController,
  facebookController,
  profileChangeController,
  profileUpdationConfirmController,
};
