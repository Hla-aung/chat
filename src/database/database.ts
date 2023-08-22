import mongoose from "mongoose";

const mongoDbUrl: string = process.env.MONGODB_URL!;

const connectToDB = async () => {
    try{
        await mongoose.connect(mongoDbUrl)
        .catch(() => {
            throw new Error("Mongodb is not connnected")
        })
    }
    catch (e){
        throw new Error("Error on connecting to the server!")
    }
}

export default connectToDB;