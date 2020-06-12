import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "./configs/configs.env",
});

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});
 //Verifying the Nodemailer Transport instance
 transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

export default transporter;
