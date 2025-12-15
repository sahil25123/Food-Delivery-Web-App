import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const register=async (req , res) =>{
    try {
        req.body = {FullName , email , password , mobile  , role}

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({message : "User Already Exists"})
        }

        if(password.length <6){
            return res.status(400).json({message : "Password Minimum must be 6 Characters"})
        }

        if(mobile!=10){
            return res.status(400).json({message : "Must be of 10 digits"})

        }

        const hashedPassword = await bcrypt.hash(password , 10);
        user = await User.create({
            fullName ,
            email , 
            role, 
            mobile , 
            password : hashedPassword
        })

    }
    catch(e){

    }

}