import connectToDB from "@/database/database"
import User from "@/model/userModel"
import {NextRequest, NextResponse} from "next/server"
import { getServerSession } from "next-auth"

export const GET = async (req: NextRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const session = await getServerSession();

        const user = await User.findOne({email: session.user.email})

        return NextResponse.json({user: user}, {status: 200})
    }
    catch(e) {
        return NextResponse.json({message: "Error"}, {status: 500})
    }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const {email} = await req.json();

        const friend = await User.findOne({email: email})

        if(!friend) return NextResponse.json({message: "Friend is not existed!"}, {status: 401})

        const session = await getServerSession()

        const alreadyAdded = friend.friendRequests.includes(session.user.email)

        if(alreadyAdded){
            return NextResponse.json({message: "Already request sent!"}, {status: 401})
        }

        const alreadyFriend = friend.friends.includes(session.user.email)

        if(alreadyFriend){
            return NextResponse.json({message: "You are already friends!"}, {status: 401})
        }

        if(session.user.email === friend.email) {
            return NextResponse.json({message: "You can't add yourself as a friend!"}, {status: 401})
        }

        await User.updateOne({_id: friend._id}, {$push: {friendRequests: session.user.email}})
        return NextResponse.json({message: "Friend request sent"}, {status: 201})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}

