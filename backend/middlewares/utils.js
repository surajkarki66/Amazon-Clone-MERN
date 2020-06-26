import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).json({ msg: "Token is not supplied." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    return next();
  }
  return res.status(401).json({ msg: "Admin Token is not valid." });
};

export { isAuth, isAdmin, getToken };
