import mongoose from "mongoose";

const mongoDbUrl: string = process.env.MONGODB_URL!;
let isConnected: boolean = false;

const connectToDB = async () => {
    if (isConnected) {
        console.log("MongoDB is connected");
    }

    try{
        await mongoose.connect(mongoDbUrl);
        isConnected = true;
    }
    catch (err){
        console.log(err)
    }
}

export default connectToDB;