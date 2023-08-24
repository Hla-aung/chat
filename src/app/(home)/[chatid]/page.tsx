"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";

const Chat = () => {
  const {chatid} = useParams()
  const [user, setUser] = useState();
  const [chatPartner, setChatPartner] = useState([]);
  const [initialChat, setInitialChat] = useState();

  const [userId1, userId2] = (chatid as string)?.split("--") ?? []

  useEffect(() => {
    fetch("http://localhost:3000/api/friends")
    .then(res => res.json())
    .then(data => {
      setUser(data.user)
      return data.user
    })
    .then(user => {
      const chatPartnerId = user._id === userId1 ? userId2 : userId1

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(chatPartnerId)
      }

      fetch("http://localhost:3000/api/friends/friendById", options)
      .then(res => res.json())
      .then(data => setChatPartner(data.friend))
    })
  }, [userId1, userId2])

  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chatid)
    }

    fetch("http://localhost:3000/api/messages", options)
    .then(res => res.json())
    .then(data => setInitialChat(data.messages))
  }, [chatid])

  return (
    <div className="w-8/12 border h-[calc(100vh-100px)]">
        <ChatHeader chatPartner={chatPartner}/>
        <ChatBody initialChat={initialChat}/>
        <ChatInput user={user} chatPartner={chatPartner} chatId={chatid}/>
    </div>
  )
}

export default Chat