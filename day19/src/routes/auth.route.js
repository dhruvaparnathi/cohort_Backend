import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';
import { registerValidator } from '../validations/auth.validator.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, registerUser);

export default authRouter;