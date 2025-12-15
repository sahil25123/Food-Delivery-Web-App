import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });
import express from "express";
import connectDB from "./config/db.js";

const port=process.env.PORT || 9000;


const app = express();



app.get("/" ,(req, res)=>{
    res.send("This is the test page ")
})

app.listen(port ,(req,res)=>{
    connectDB()
    console.log(`Server is Running on Port ${port}`);
} )