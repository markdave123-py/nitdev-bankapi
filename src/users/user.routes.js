import { Router } from "express";
import { signup } from "./user.controllers.js";
import { siginin } from "./user.controllers.js";

export const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', siginin);
