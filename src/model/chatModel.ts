import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
    chat_id: {
        type: String
    },
    messages: {
        type: Array<Object>
    }
},
{
    timestamps: true
})

const Chat = models.Chat || model("Chat", ChatSchema)

export default Chat



