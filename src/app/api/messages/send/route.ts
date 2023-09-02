import connectToDB from "@/database/database";
import Chat from "@/model/chatModel";
import {v4 as uuidv4} from "uuid"
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/utils/pusher";


export const POST =async (req: NextRequest, res: NextResponse) => {
    try{
        const {chatId, senderId, text} = await req.json()
        

        await connectToDB();

        const [userId1, userId2] = (chatId as string)?.split("--") ?? []

        const friendId = senderId === userId1 ? userId2 : userId1

        const conversation = await Chat.findOne({chat_id: chatId})

        const message = {
            _id: uuidv4(),
            message: text,
            senderId: senderId,
            timestamp: Date.now()
        }
        
        await pusherServer.trigger(chatId, "incomingMessages", message)
        await pusherServer.trigger(friendId, "newMessage", message)

        if(!conversation){
            await Chat.create({
                chat_id: chatId,
                messages: [message]
            })

            return NextResponse.json({message: "New conversation created"}, {status: 201})
        }

        await Chat.updateOne({chat_id: chatId}, {
            $push: {
                messages: message
            }
        })

        return NextResponse.json({message: "Message has been sent"}, {status: 200})
    }
    catch(e){
        return NextResponse.json({message: "Something went wrong!"}, {status: 500})
    }
}