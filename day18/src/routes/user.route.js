import express from "express";
import {registerUser} from "../controllers/registerUser.controller.js";

const authRouter = express.Router();

authRouter.post('/register',registerUser);

export default authRouter;
