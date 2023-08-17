import connectToDB from "@/database/database"
import User from "@/model/userModel"
import {NextRequest, NextResponse} from "next/server"
import { NextApiRequest } from "next"
import {getServerSession} from "next-auth/next"

export const POST = async (req: NextRequest & NextApiRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const {email} = await req.json();

        const friend = await User.findOne({email: email})

        if(!friend) return new Response("Email not found", {status: 401})

        const session = await getServerSession()

        if(session?.user.email === friend?.email) {
            return new Response("You can't add yourself as a friend")
        }
    }
    catch(e){
        console.log(e)
    }
}