import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'

const inter = Roboto_Slab({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'A simple chat app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
