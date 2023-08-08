import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"

const googleId: string = process.env.GOOGLE_ID!;
const googleSecret: string = process.env.GOOGLE_SECRET!;

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        })
    ]
})

export {handler as GET, handler as POST}