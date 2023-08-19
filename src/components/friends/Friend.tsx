"use client"

import { useEffect, useState } from "react"
import FriendSearch from "./FriendSearch"
import FriendRequests from "./FriendRequests"

const Friend = () => {
  const [user, setUser] = useState(null)
  const [requestSender, setRequestSender] = useState([])
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('http://localhost:3000/api/friends')
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user)
        return data.user
      })
      .then(user => {
        Promise.all(
          user.friendRequests.map(async (email: string) => {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(email)
            }
    
            const data = await fetch("http://localhost:3000/api/friends/friend-requests", options)
            .then(res => res.json())
            return data.requestSender
          })
        ).then(value => setRequestSender(value))
        .catch(e => console.log(e))

        setLoading(false)
      })
    }, [])

  return (
    <div className="w-2/5">
        <FriendSearch />
        <FriendRequests isLoading={isLoading} requestSender={requestSender} setRequestSender={setRequestSender}/>
    </div>
  )
}

export default Friend