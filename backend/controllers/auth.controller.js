import User from '../models/user.model';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

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
      }
    });
  }
};

