'use client'

import { useSession, signOut } from "next-auth/react"
import {useRouter} from "next/navigation"

export default function Home() {

  const {data: session, status} = useSession();
  const router = useRouter();

  if(status === "loading") {
    return null
  } 

  if(status === "unauthenticated") {
    router.replace("/login")
  }

  return (
    <>
    {
      status === "authenticated" && (
        <>
          <div>{JSON.stringify(session)}</div>
          <button onClick={() => signOut({callbackUrl: "/login"})}>Sign Out</button>
        </>
      )
    }
      
    </>
  )
}