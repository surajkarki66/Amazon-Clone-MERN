import User from "../../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});

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
                  return res.json({
                    token,
                    user: { _id, email, name, role },
                  });
                }
              })
              .catch((err) => {
                return res.status(400).json({
                  error: "User signup failed with facebook",
                });
              });
          }
        })
        .catch((error) => {
          return res.json({
            error: "Something went wrong with database !",
          });
        });
    })
    .catch((error) => {
      res.json({
        error: "Facebook login failed. Try later",
      });
    });
};

export default facebookController;
