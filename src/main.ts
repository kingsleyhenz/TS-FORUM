import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import cookieSession from "cookie-session";
import {
  newPostRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  newCommentRouter,
  deleteCommentRouter,
} from "./router";
import { requireAuth } from "../common";

const app = express();

app.use(cors(
  {
    origin: "*",
    optionsSuccessStatus: 200,
  }
  ))

  app.set('trust proxy', true);

app.use(
  urlencoded({
    extended: false,
  })
);

app.use(json());

app.use(cookieSession({
  signed: false,
  secure: false
}))

app.use(requireAuth ,newPostRouter)
app.use(requireAuth ,deletePostRouter);
app.use(requireAuth ,updatePostRouter);
app.use(showPostRouter);

app.use(requireAuth ,newCommentRouter);
app.use(requireAuth ,deleteCommentRouter);


app.all('*', (req,res,next)=>{
    const error = new Error ('not found') as CustomError;
    error.status = 404;
    next(error)
})
declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status)
      return res.status(error.status).json({ message: error.message });
    res.status(500).json({ message: "Something went wrong" });
  }
);

const start = async () => {
  if (!process.env.DB_URI) throw new Error("DB_URI is required");
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required");

  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    throw new Error("Database Error");
  }
  app.listen(8000, () => console.log("Server is Active on port 8000"));
};

start();
