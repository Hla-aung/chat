// import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const mongoDbUrl: string = process.env.MONGODB_URL!;

const connectToDB = async () => {
    try{
        await mongoose.connect(mongoDbUrl)
        .then(() => console.log("Mongodb is connected"))
        .catch(() => {
            throw new Error("Mongodb is not connnected")
        })
    }
    catch (e){
        throw new Error("Error on connecting to the server!")
    }
}

export default connectToDB;