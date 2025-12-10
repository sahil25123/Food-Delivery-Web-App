import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const port=process.env.PORT || 9000;

const app = express();

app.get("/" ,(req, res)=>{
    res.send("This is the test page ")
})

app.listen(port ,(req,res)=>{
    console.log(`Server is Running on Port ${port}`);
} )