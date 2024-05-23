import { createDepositController } from "./deposit.controller.js";
import { Router } from "express";
import { auth } from "../middlewares/auth.js";

export const depositRouter = Router();

depositRouter.post("/:walletID",auth, createDepositController);