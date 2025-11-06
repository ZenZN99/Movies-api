import express from "express";
import * as userController from "../controllers/user.controller.js";
import { isAuthenticate } from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.get("/me", isAuthenticate, userController.me);

export default userRouter;
