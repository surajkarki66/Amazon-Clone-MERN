import express from 'express';

const router = express.Router();

// Load all controllers
const { registerController } = require( '../controllers/auth.controller');

// Routes 
router.post("/register", registerController);

export default router;