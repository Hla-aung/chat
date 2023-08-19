import connectToDB from "@/database/database";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req:NextRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const email = await req.json();

        const session = await getServerSession()

        await User.updateOne({email: session.user.email}, {
            $pull: {
                friendRequests: email
            }
        })

        return NextResponse.json({message: "Friend request has been cancelled"}, {status: 200})
    }
    catch(e){
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}