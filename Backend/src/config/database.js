import mongoose from "mongoose";

const connectDB = async ()=> {
    const connection = await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Connected to DB");
    
};

export default connectDB;