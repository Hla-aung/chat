"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import { InitialChat } from "@/types/types";


const Chat = () => {
  const {chatid} = useParams()
  const [user, setUser] = useState();
  const [chatPartner, setChatPartner] = useState([]);
  const [initialChat, setInitialChat] = useState<InitialChat[]>([]);

  const [userId1, userId2] = (chatid as string)?.split("--") ?? []

  useEffect(() => {
    fetch("/api/friends")
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

      fetch("/api/friends/friendById", options)
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

    fetch("/api/messages", options)
    .then(res => res.json())
    .then(data => {
      if(data.messages === undefined){
        setInitialChat([])
      } else {
        setInitialChat(data.messages)
      }
      })
  }, [chatid])

  return (
    <div className="w-full md:w-8/12 md:border md:h-[calc(100vh-100px)]">
        <ChatHeader chatPartner={chatPartner} chatId={chatid}/>
        <ChatBody initialChat={initialChat} user={user} chatId={chatid}/>
        <ChatInput user={user} chatPartner={chatPartner} chatId={chatid}/>
    </div>
  )
}

export default Chat