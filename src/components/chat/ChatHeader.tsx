"use client"

import { Friends } from "../friends/FriendAccepted";
import Image from "next/image";
import { FaTrash } from "react-icons/fa"
import { IconContext } from "react-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type ChatPartner = Array<Friends>;

const ChatHeader = ({ chatPartner, chatId }: { chatPartner: ChatPartner, chatId: string | string[] }) => {
  const [friend] = chatPartner ?? [];
  const [confirm, setConfirm] = useState<boolean>(false)

  const router = useRouter()

  const confirmDelete = () => {
    setConfirm(true)
  }

  const deleteConversation = async() => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chatId)
    }

    await fetch('http://localhost:3000/api/messages', options)
  }

  confirm && Swal.fire({
    title: 'Do you want to delete this conversation?',
    confirmButtonText: 'Delete it',
    showCancelButton: true
  })
  .then((result) => {
    if(result.isConfirmed){
      deleteConversation()
      setConfirm(false)
      window.location.reload()
    }
    
  })

  return (
    <IconContext.Provider value={{color: "red", size: "20px"}}>
    {chatPartner && <div className="w-full shadow-sm px-3 flex justify-between items-center">
      <div className="flex items-center gap-5 border-b-2 py-3">
        {friend?.image ? (
          <Image
            src={friend?.image}
            alt=""
            width={100}
            height={100}
            className="w-16 h-16 rounded-full"
            priority
          />
        ) : (
          <div className="text-primary text-2xl border border-primary w-16 h-16  font-semibold rounded-full uppercase flex justify-center items-center flex-shrink-0">
            <p>{friend?.username.slice(0, 2)}</p>
          </div>
        )}
        <div className="w-full">
          <p className="text-xl font-semibold">{friend?.username}</p>
        </div>
      </div>
      <div onClick={confirmDelete} className="cursor-pointer">
        <FaTrash />
      </div>
    </div>}
    </IconContext.Provider>
  );
};

export default ChatHeader;
