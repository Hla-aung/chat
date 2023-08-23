"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";

const Chat = () => {
  const {chatid} = useParams()
  const [user, setUser] = useState({});
  const [chatPartner, setChatPartner] = useState([]);

  const [userId1, userId2] = (chatid as string).split("--")

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

  return (
    <div className="w-8/12 border h-[calc(100vh-100px)]">
        <ChatHeader chatPartner={chatPartner}/>
    </div>
  )
}

export default Chat