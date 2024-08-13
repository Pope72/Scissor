import express from "express";
import { Login, Logout, Signup, verify } from "../controllers/userController.js";
import {
  createLink,
  fetchAllLinks,
  getLink,
} from "../controllers/linkController.js";
import protectedRouting from "../middlewares/protectedRouting.js";
const userRouter = express.Router();
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.post("/logout", Logout);
userRouter.post("/create", protectedRouting, createLink);
userRouter.get("/link/:link", getLink);
userRouter.get("/all", protectedRouting, fetchAllLinks);
userRouter.get("/verify", protectedRouting, verify);
export default userRouter;
