import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config();

const connectDB = async ()=>{
    try {
       const InstanceConnection = await mongoose.connect(`${process.env.MONGO_URL}`,{
    
       });
       console.log(`MongoDB Connected !! ${InstanceConnection.connection.host}`);

    } catch (error) {
        console.log("Mongodb coonection error ",error.message);
        process.exit(1);
    }
}
export default connectDB;