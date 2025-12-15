import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : { 
        type : String , 
        required: true , 
    } , 
    email :{ 
        type :String , 
        require  :true , 
        unique :true 
    } ,
    password : { 
        type : String
    } , 
    mobile : {
        type : Number , 
        required : true , 
        unique : true 
    } , 
    role :{ 
        type : String  , 
        enum : ["user" , "food_patner" ,"owner" ]

    }


},{ timestamps : true})

const User = mongoose.model("User" , userSchema);

export default User;