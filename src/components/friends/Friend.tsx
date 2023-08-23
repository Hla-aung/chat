"use client"

import { useEffect, useState } from "react"
import FriendSearch from "./FriendSearch"
import FriendRequests from "./FriendRequests"
import FriendAccepted from "./FriendAccepted"

const Friend = () => {
  const [requestSender, setRequestSender] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [friends, setFriends] = useState([])
  const [user, setUser] = useState();
 
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

        Promise.all(
          user.friends.map(async (email: string) => {
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
        ).then(value => setFriends(value))
        .catch(e => console.log(e))
        .finally(() => {
          setLoading(false)
        })
      })
    }, [])

  return (
    <div className="w-4/12 pr-3">
        <FriendSearch />
        <FriendRequests isLoading={isLoading} requestSender={requestSender} setRequestSender={setRequestSender}/>
        <FriendAccepted isLoading={isLoading} friends={friends} user={user}/>
    </div>
  )
}

export default Friend