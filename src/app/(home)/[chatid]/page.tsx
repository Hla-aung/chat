"use client"
import { useParams } from "next/navigation";

const Chat = () => {
    
    const {chatid} = useParams()
    
  return (
    <div>
        {chatid}
    </div>
  )
}

export default Chat