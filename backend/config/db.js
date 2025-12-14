import mongoose from "mongoose"

const connectDB = async () => {
    const mongo_uri = process.env.MONGO_URI;
    console.log("DB:", mongo_uri);
    try {
        await mongoose.connect(mongo_uri);
        console.log("MongoDB Connected");
    } catch (e) {
        console.log("Error in the Database Connection:", e);
    }
}


export default connectDB;