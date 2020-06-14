import User from "../../models/user.model";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});

const resetPasswordController = (req, res) => {
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
          User.findOne({
            resetPasswordLink,
          })
            .then((user) => {
              if (!user) {
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
                user
                  .save()
                  .then((result) => {
                    if (result) {
                      return res.json({
                        message: `Great! Now you can login with your new password`,
                      });
                    }
                  })
                  .catch((error) => {
                    return res.status(400).json({
                      error: "Error reseting user password",
                    });
                  });
              }
            })
            .catch((error) => {
              return res.status(400).json({
                error: "Something went wrong with database !",
              });
            });
        }
      });
    }
  }
};

export default resetPasswordController;
