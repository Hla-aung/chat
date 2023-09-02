"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/Loading";

// components
import Navbar from "@/components/common/Navbar";
import Friend from "@/components/friends/Friend";
import { useState } from "react";

import {IoMdClose} from "react-icons/io"
import { IconContext } from "react-icons";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showUser, setShowUser] = useState<boolean>(false)

  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.replace("/login");
  }
  return (
      <>
        {status === "authenticated" && (
          <div className="w-full max-h-screen relative">
            <Navbar userSession={session?.user} setShowUser={setShowUser}/>
            {
              showUser && (
                <IconContext.Provider value={{size: "30px", className: "absolute right-3 top-3"}}>
                <div className="absolute top-0 right-0 w-full bg-white min-h-screen">
                  <div onClick={() => setShowUser(false)}>
                    <IoMdClose/>  
                  </div>
                  
                  <Friend classname="md:hidden w-full px-3 pt-3" setShowUser={setShowUser}/>
                </div>
                </IconContext.Provider>
              )
            }
            <div className="w-full flex md:px-7">
              <Friend classname="hidden md:block w-4/12"/>
              {children}
            </div>
          </div>
        )}
      </>
  );
}
