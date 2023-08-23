import connectToDB from "@/database/database";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const id = await req.json();
        const friend = await User.find({_id: id}).select({email: 1, image: 1, username: 1, _id: 1})

        return NextResponse.json({friend: friend}, {status: 200})
    }
    catch(e) {
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}