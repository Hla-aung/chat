"use client";

import { useState } from "react";
import TextArea from "rc-textarea";
import SendIcon from "@/icons/SendIcon";
import { Friends } from "../friends/FriendAccepted";
import EmojiPicker from "emoji-picker-react";

type ChatPartner = Array<Friends>;

const ChatInput = ({
  user,
  chatPartner,
  chatId
}: {
  user: Friends;
  chatPartner: ChatPartner;
  chatId: string | string[]
}) => {
  const [input, setInput] = useState<string>("");
  const [friend] = chatPartner ?? [];
  const senderId = user?._id
  const sendMessage = async() => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({chatId, senderId, text: input})
    }
    await fetch("http://localhost:3000/api/messages/send", options)
    setInput("")
  };

  return (
    <>
    {chatPartner && <div className="w-full max-h-[100px]">
      <div className="flex justify-between items-center px-5">
        <TextArea
          className="primary-input"
          value={input}
          onPressEnter={sendMessage}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${friend?.username}`}
          rows={1.5}
        />
        <SendIcon className="w-12 cursor-pointer" eventhandler={sendMessage} />
      </div>
    </div>}
    </>
  );
};

export default ChatInput;
