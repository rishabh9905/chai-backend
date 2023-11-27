import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log( `\n MongoDB connection !! DB HOST: ${connectionInstance.connection.host}`.bgGreen);
        
    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1) // TODO task read about process in node js
        
    }
};

export default connectDB;