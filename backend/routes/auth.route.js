import express from 'express';

const router = express.Router();

// Load validator
const {
    validSignUp
  } = require("../helpers/authValidation");

// Load all controllers
const { registerController, activationController } = require( '../controllers/auth.controller');

// Routes 
router.post("/register",validSignUp, registerController);
router.post("/activation", activationController);

export default router;