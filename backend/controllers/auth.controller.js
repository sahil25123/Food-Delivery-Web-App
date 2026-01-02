import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"

export const register = async (req, res) => {
    try {
        // Correct way to destructure from req.body
        const { fullName, email, password, mobile, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Validate mobile number length and format
        if (!mobile || mobile.toString().length !== 10) {
            return res.status(400).json({ message: "Mobile number must be 10 digits" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user  
        const newUser = await User.create({
            fullName,
            email,
            role: role || 'user', // Default role if not provided
            mobile,
            password: hashedPassword
        });

        // Generate token (assuming genToken returns a token)
        const token = await genToken(newUser._id);
        
        // Set cookie
        res.cookie("token", token, {
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true
        });

        // Return response without password
        const userResponse = {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            mobile: newUser.mobile,
            createdAt: newUser.createdAt
        };

        return res.status(201).json({
            message: "User registered successfully",
            user: userResponse,
            token: token // Optional: also send token in response
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ 
            message: `Error in registration: ${error.message}` 
        });
    }
}

export const login =async(req,res)=>{
    try { 
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        // Generate token (assuming genToken returns a token)
        const token = await genToken(user._id);

        // Set cookie
        res.cookie("token", token, {
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true
        });

        // Return response without password
        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
            createdAt: user.createdAt
        };

        return res.status(200).json({
            message: "Login successful",
            user: userResponse,
            token: token // Optional: also send token in response
        });

    } catch (e) {
        return res.status(500).json({ message: `Login Error: ${e.message}` });
    }
}

export const logout= async (req, res)=>{

    try{
        res.clearCookie("token")
        return res.status(200).json({message  : "Logout Scuccessfully"})

    }
    catch(e){
    return res.status(500).json({ message : `Login in Error : ${e}`})

    }
}