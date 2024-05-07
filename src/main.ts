import * as dotenv from "dotenv"
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";


const app = express();

app.use(urlencoded({
    extended: true
}));

app.use(json());

declare global{
    interface CustomError extends Error{
        status?: number;
    }
}

app.use((error: CustomError, req:Request, res: Response, next: NextFunction) =>{
    if(error.status) return res.status(error.status).json({ message: error.message });
    res.status(500).json({ message: 'Something went wrong'})
})

const start = async ()=>{
    if(!process.env.DB_URI) throw new Error("DB_URI is required");
    
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        throw new Error("Database Error")
    }
    app.listen(8000,()=> console.log("Server is Active on port 8000"));
}


start();