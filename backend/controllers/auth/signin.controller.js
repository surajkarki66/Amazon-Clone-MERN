import User from "../../models/user.model";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});

const signinController = (req, res) => {
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
    })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            errors: "User with that email does not exist. Please signup",
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
      })
      .catch((err) => {
        return res.json({
          error: "Something went wrong with database.",
        });
      });
  }
};

export default signinController;
