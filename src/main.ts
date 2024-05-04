import * as dotenv from "dotenv"
dotenv.config();
import express from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";


const app = express();

app.use(urlencoded({
    extended: true
}));

app.use(json());

const start = async ()=>{
    if(!process.env.DB_URI) throw new Error("DB_URI is required");
    
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        throw new Error("Database Error")
    }
    app.listen(5050,()=> console.log("Server is Active on port 5050"));
}


start();