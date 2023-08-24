import connectToDB from "@/database/database";
import Chat from "@/model/chatModel";
import {v4 as uuidv4} from "uuid"
import { NextRequest, NextResponse } from "next/server";


export const POST =async (req: NextRequest, res: NextResponse) => {
    try{
        await connectToDB();

        const {chatId, senderId, text} = await req.json()

        const conversation = await Chat.findOne({chat_id: chatId})

        if(!conversation){
            await Chat.create({
                chat_id: chatId,
                messages: [{
                    _id: uuidv4(),
                    message: text,
                    senderId: senderId,
                    timestamp: Date.now()
                }]
            })

            return NextResponse.json({message: "New conversation created"}, {status: 201})
        }

        await Chat.updateOne({chat_id: chatId}, {
            $push: {
                messages: {
                    _id: uuidv4(),
                    message: text,
                    senderId: senderId,
                    timestamp: Date.now()
                }
            }
        })

        return NextResponse.json({message: "Message has been sent"}, {status: 200})
    }
    catch(e){
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}