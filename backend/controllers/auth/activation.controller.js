import User from "../../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});
const { errorHandler } = require("../../helpers/dbErrorHandling");

const activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, _) => {
      if (err) {
        return res.status(401).json({
          error: err,
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        const user = new User({
          name,
          email,
          password,
        });

        user
          .save()
          .then((user) => {
            if (user) {
              return res.json({
                success: true,
                user: user,
                message: "Your account is succesfully activated..",
              });
            }
          })
          .catch((err) => {
            return res.status(401).json({
              success: false,
              error: errorHandler(err),
            });
          });
      }
    });
  } else {
    return res.json({
      message: "token is not in the body!",
    });
  }
};

export default activationController;