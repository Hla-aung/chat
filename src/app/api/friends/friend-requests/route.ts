import connectToDB from "@/database/database";
import User from "@/model/userModel";
import { pusherServer } from "@/utils/pusher";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const email = await req.json();
        const requestSender = await User.find({email: email}).select({id: 1, email: 1, username: 1, image: 1}) 

        return NextResponse.json({requestSender: requestSender}, {status: 200})
    }
    catch(e) {
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}