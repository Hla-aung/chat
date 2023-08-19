"use client"

import { useEffect, useState } from "react"
import FriendSearch from "./FriendSearch"


const Friend = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/friends')
      .then((res) => res.json())
      .then((data) => {
        setData(data.user)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  console.log(data)
  return (
    <div className="w-2/5">
        <FriendSearch />
    </div>
  )
}

export default Friend