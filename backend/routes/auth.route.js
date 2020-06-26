import express from "express";

const router = express.Router();

import {
  registerController,
  activationController,
  signinController,
  forgetPasswordController,
  resetPasswordController,
  facebookController,
  profileChangeController,
  profileUpdationConfirmController
} from '../controllers/auth/auth.controller';


// Load validator
const {
  validSignUp,
  validSignIn,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/authValidation");

// Routes
router.post("/register", validSignUp, registerController);
router.patch("/activation", activationController);
router.post("/signin", validSignIn, signinController);
router.post("/forget", forgotPasswordValidator, forgetPasswordController);
router.put("/reset", resetPasswordValidator, resetPasswordController);
router.post('/user/:id', profileChangeController);
router.put('/profile/confirm', profileUpdationConfirmController);


export default router;
