import { Schema, model } from "mongoose";

const ChatSchema = new Schema({
    chat_id: {
        type: String
    },
    messages: {
        type: Array
    }
},
{
    timestamps: true
})

const Chat = model("Chat", ChatSchema)

export default Chat



