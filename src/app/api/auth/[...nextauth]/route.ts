import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDB from '@/database/database';
import User from '@/model/userModel';
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

const googleId: string = process.env.GOOGLE_ID!;
const googleSecret: string = process.env.GOOGLE_SECRET!;

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        }),
        CredentialsProvider({
            name: "credentials",
            type: "credentials",
            credentials: {},
            authorize: async(credentials: {email: string, password: string}, req) => {
                try {
                    await connectToDB()

                    const user = await User.findOne({email: credentials.email})
                    
                    if(!user) throw new Error("User not existed")

                    const checkpassword = await compare(credentials.password, user.password)

                    if(!checkpassword) throw new Error("Password is wrong!")

                    return user
                } 
                catch (e) {
                    throw new Error("Sign in error")
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            
            if(user){
                return {
                    ...token,
                    id: user.id,
                    username: user.username
                }
            }
            return token
        },
        async session({session, token}){
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username
                }
            }
        },
        async signIn({profile}){
            try{
                await connectToDB();

                const user = await User.findOne({email: profile.email})

                if(!user){
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture || profile.image,
                        pasword: ""
                    })
                }

                return true;
            }
            catch(e){
                return false;
            }
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
})
    

export {handler as GET, handler as POST}