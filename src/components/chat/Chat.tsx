"use client"

import { useEffect, useState } from "react"

const Chat = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        fetch("http://localhost:3000/api/friends")
        .then(res => res.json())
        .then(data => setUser(data.user))
    }, [])

    console.log(user)
    
  return (
    <div>Chat
        
    </div>
  )
}

export default Chat