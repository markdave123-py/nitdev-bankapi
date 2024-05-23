import { createWalletController } from "./wallet.controller.js";
import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { getWalletByUserIdController } from "./wallet.controller.js";
import { deleteWalletController } from "./wallet.controller.js";

export const walletRouter = Router();

walletRouter.post("/create", auth, createWalletController);
walletRouter.get("/", auth, getWalletByUserIdController);
walletRouter.delete("/delete/:id", auth, deleteWalletController);