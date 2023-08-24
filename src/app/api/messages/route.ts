import connectToDB from "@/database/database";
import Chat from "@/model/chatModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const chatId = await req.json();

        const conversation = await Chat.findOne({chat_id: chatId})

        if(!conversation) {
            return NextResponse.json({message: "Start a new conversation"}, {status: 400})
        }
        
        return NextResponse.json({messages: conversation.messages}, {status: 200})
    }
    catch(e){
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}