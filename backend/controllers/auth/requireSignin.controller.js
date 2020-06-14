import expressJwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config({
  path: "./configs/configs.env",
});


const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

export default requireSignin;
