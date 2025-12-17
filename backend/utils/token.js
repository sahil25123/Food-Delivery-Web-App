import jwt from "jsonwebtoken"
const genToken = async(userId)=>{
    try{

        const secret = process.env.JWT_SECRET
        const token = await jwt.sign({userId}, 
            secret , 
            {expiresIn :"3d"}

        )
        return token;

    }
    catch(e){
        console.log(e)
        return res.status(500).json({message : e.message})

    }

}

export default genToken;