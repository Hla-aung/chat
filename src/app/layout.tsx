"use client"

import '@/styles/globals.css'
import { Roboto_Flex } from 'next/font/google'
import {SessionProvider} from "next-auth/react"
import { Session } from 'next-auth'

const roboto = Roboto_Flex({ subsets: ['latin'] })

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode,
  session: Session
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="style.css" as="style" />
        <link rel="icon" href="/logo.svg"/>
        <title>Whisper</title>
      </head>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
