import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

const port=process.env.PORT || 9000;


const app = express();
app.use(cors(
    {
        origin : "*", 
        Credential : true
    }
))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRouter)

app.get("/" ,(req, res)=>{
    res.send("This is the test page ")
})

app.listen(port ,(req,res)=>{
    connectDB()
    console.log(`Server is Running on Port ${port}`);
} )