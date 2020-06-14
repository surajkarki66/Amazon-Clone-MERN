import express from "express";

const router = express.Router();

import registerController from "../controllers/auth/register.controller";
import activationController from "../controllers/auth/activation.controller";
import signinController from "../controllers/auth/signin.controller";
import forgetPasswordController from "../controllers/auth/forgetPassword.controller"
import resetPasswordController from "../controllers/auth/resetPassword.controller";

// Load validator
const {
  validSignUp,
  validSignIn,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/authValidation");

// Routes
router.post("/register", validSignUp, registerController);
router.post("/activation", activationController);
router.post("/signin", validSignIn, signinController);
router.put("/forget", forgotPasswordValidator, forgetPasswordController);
router.put("/reset", resetPasswordValidator, resetPasswordController);

export default router;
