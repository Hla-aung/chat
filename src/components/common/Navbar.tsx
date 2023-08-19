'use client'

import { useState } from "react"
import { Bubblegum_Sans } from "next/font/google"
import { signOut } from "next-auth/react"
import Logo from "@/icons/Logo"
import Image from "next/image"
import Aside from "../ui/Aside"

const bubbleGum = Bubblegum_Sans({ weight: "400", adjustFontFallback: true, fallback: ['serif'], subsets: ['latin'] })

const Navbar = (userSession:{name ?: string, username ?: string, email ?: string, image ?: string}) => {
    const [showUser, setShowUser] = useState(false)
  return (
    <div className={`w-full h-auto flex justify-between items-center px-3 md:px-32 py-2 shadow-md`}>
        {/* Logo */}
        <div className="flex items-center">
            <Logo className="w-12 h-12 md:w-20 md:h-20"/>
            <p className={`${bubbleGum.className} text-3xl md:text-4xl text-primary select-none`}>Whisper</p>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 relative">
            <button className="primary-button hidden md:block" onClick={() => signOut({callbackUrl: "/login"})}>
                Sign Out
            </button>
            
            {userSession.image
            ? <Image src={userSession?.image} alt="" width={100} height={100} className="rounded-full w-12 h-12 md:w-20 md:h-20 cursor-pointer" onClick={() => setShowUser(!showUser)}/>
            :
            <div className="cursor-pointer rounded-full w-12 h-12 md:w-20 md:h-20 flex-shrink-0 border-2 border-primary flex justify-center items-center" onClick={() => setShowUser(!showUser)}>
                <p className="text-xl md:text-2xl font-semibold text-primary select-none uppercase">{userSession.username.slice(0,2) || userSession.name.slice(0, 2)}</p>
            </div>
            }

            {
                showUser && <Aside {...userSession} className="absolute right-0 top-[9vh]"/>
            }
        </div>
    </div>
  )
}

export default Navbar