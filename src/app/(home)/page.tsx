// 'use client'

// import { useSession } from "next-auth/react"
// import {useRouter} from "next/navigation"
// import Loading from "@/components/ui/Loading";

// components
// import Navbar from "@/components/common/Navbar";
// import Friend from "@/components/friends/Friend";
import Chat from "./[chatid]/page";

export default function Home() {

  // const {data: session, status} = useSession();

  // const router = useRouter();

  // if(status === "loading") {
  //   return <Loading />
  // } 

  // if(status === "unauthenticated") {
  //   router.replace("/login")
  // }

  return (
    <>
      <Chat/>  
    </>
  )
}