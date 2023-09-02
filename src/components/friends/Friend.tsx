"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import cn from "classnames"
import FriendSearch from "./FriendSearch"
import FriendRequests from "./FriendRequests"
import FriendAccepted from "./FriendAccepted"
import { Friends } from "@/types/types"

const Friend = ({classname, setShowUser}: {classname: string, setShowUser?: Dispatch<SetStateAction<boolean>>}) => {
  const [requestSender, setRequestSender] = useState([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [friends, setFriends] = useState([])
  const [user, setUser] = useState<Friends>();
 
  useEffect(() => {
    fetch('/api/friends')
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
    
            const data = await fetch("/api/friends/friend-requests", options)
            .then(res => res.json())
            return data.requestSender
          })
        ).then(value => {
          if(value === undefined){
            setRequestSender([])
          }
          setRequestSender(value)})
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
    
            const data = await fetch("/api/friends/friend-requests", options)
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
    <div className={cn("md:pr-3", classname)}>
        <FriendSearch />
        <FriendRequests isLoading={isLoading} requestSender={requestSender} setRequestSender={setRequestSender} user={user}/>
        <FriendAccepted isLoading={isLoading} friends={friends} user={user} setShowUser={setShowUser}/>
    </div>
  )
}

export default Friend