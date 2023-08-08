"use client"

import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'
import {SessionProvider} from "next-auth/react"
import { Session } from 'next-auth'

const inter = Roboto_Slab({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'A simple chat app',
}

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode,
  session: Session
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
