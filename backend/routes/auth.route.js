import express from "express";

const router = express.Router();

// Load validator
const {
  validSignUp,
  validSignIn,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/authValidation");

// Load all controllers
const {
  registerController,
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth.controller");

// Routes
router.post("/register", validSignUp, registerController);
router.post("/activation", activationController);
router.post("/signin", validSignIn, signinController);
router.put("/forget", forgotPasswordValidator, forgotPasswordController);
router.put("/reset", resetPasswordValidator, resetPasswordController);

export default router;
