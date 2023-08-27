"use client"

import { useState, useEffect } from "react";
import { Friends } from "../friends/FriendAccepted";
import cn from "classnames";
import { formatTime } from "@/utils/utilities";
import { pusherClient } from "@/utils/pusher";

export type InitialChat = {
  message: string;
  senderId: string;
  timestamp: number;
  _id: string;
}

// export type InitialChatProps = Array<InitialChat>

const ChatBody = ({initialChat, user, chatId}:{initialChat: InitialChat[], user: Friends, chatId: string | string[]}) => {
  const [messages, setMessages] = useState<InitialChat[]>(initialChat)
  const [showTime, setShowTime] = useState<number>(0)
  const [isShowTime, setIsShowTime] = useState<boolean>(false)

  useEffect(() => {
    setMessages(initialChat)
  },[initialChat])
  
  useEffect(() => {
    chatId && pusherClient.subscribe(chatId as string)

    const incomingMessages = (message: InitialChat) => {
      setMessages(prevState => [...prevState, message])
    }

    pusherClient.bind("incomingMessages", incomingMessages)

    return () => {
      pusherClient.unsubscribe(chatId as string)
      pusherClient.unbind("incomingMessages", incomingMessages)
    }
  }, [chatId])
  

  if(!initialChat){
    return (
      <div className="w-full h-[calc(100vh-300px)] flex justify-center items-center">
        <p className="text-2xl font-bold">Start a new conversation or Enter a conversation</p>
      </div>
    )
  }
  return (
    <div className="w-full h-[calc(100vh-300px)] flex flex-col-reverse overflow-y-auto px-3 gap-0.5 primary-scrollbar">
      {
        messages?.sort((a, b) => b.timestamp - a.timestamp).map((message: InitialChat, i: number) => {
          const isCurrentUser = message.senderId === user?._id
          return(
            <div key={`${message.senderId}-${message.timestamp}`}>
              <div className={cn('flex items-end',{
                'justify-end': isCurrentUser
              })}>
                <div className={cn('flex flex-col max-w-xs mx-2',{
                  'order-1 items-end': isCurrentUser,
                  'order-2 items-start': !isCurrentUser 
                })}>
                  <span className={cn('p-2 inline-block rounded-xl cursor-pointer', {
                    'bg-primary text-white': isCurrentUser,
                    'bg-gray-500 text-white': !isCurrentUser
                  })} onClick={() => {
                    setShowTime(message.timestamp)
                    setIsShowTime(!isShowTime)
                    }}>
                    {message.message}
                  </span>
                  {(showTime === message.timestamp && isShowTime) && <span>{formatTime(message.timestamp)}</span>}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ChatBody