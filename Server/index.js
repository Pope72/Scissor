import express from "express";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/router.js";
dotenv.config();
const server = express();
server.use(
  cors({
    origin: "https://scissor2.vercel.app", // Allow the specific origin
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // Allow credentials
  })
);
server.use(cookieParser());
const PORT = 8000;
server.use(express.json({limit:"10mb"}));
server.use(userRouter);

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
  connectDB();
});
