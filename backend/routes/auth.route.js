import express from 'express';

const router = express.Router();

// Load validator
const {
    validSignUp
  } = require("../helpers/authValidation");

// Load all controllers
const { registerController } = require( '../controllers/auth.controller');

// Routes 
router.post("/register",validSignUp, registerController);

export default router;