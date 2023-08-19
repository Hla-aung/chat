import connectToDB from "@/database/database";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req:NextRequest, res:NextResponse) => {
    try{
        await connectToDB()

        const email = await req.json();

        const session = await getServerSession()

        const user = await User.findOne({email: session.user.email})

        const alreadyFriend = user.friends.includes(email)

        if(alreadyFriend){
            return NextResponse.json({message: "You are already friends!"}, {status: 400})
        }

        const requestFriend = user.friendRequests.includes(email)

        if(!requestFriend){
            return NextResponse.json({
                message: "No friend request"
            }, {status: 400})
        }

        await User.updateOne({email: user.email}, {
            $push: {friends: email}
        })

        await User.updateOne({email: email}, {
            $push: {friends: user.email}
        })

        await User.updateOne({email: user.email}, {
            $pull: {
                friendRequests: email
            }
        })

        return NextResponse.json({message: "Friend accepted!"}, {status: 200})
    }
    catch(e){
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}