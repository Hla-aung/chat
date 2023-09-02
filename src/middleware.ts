import {withAuth} from 'next-auth/middleware'
import {getToken} from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export default withAuth(async function middleware(req) {
    const pathname = req.nextUrl.pathname

    const isAuth = await getToken({req})
    const isLoginPage = pathname.startsWith('/login')
    const isRegisterPage = pathname.startsWith('/register')
    const isAccessingSensitiveRoute = pathname.startsWith('/')

    if(isLoginPage || isRegisterPage){
        if(isAuth){
            return NextResponse.redirect('https://chat-ten-sand.vercel.app/')
        }
        return NextResponse.next()
    }

    if(!isAuth && isAccessingSensitiveRoute){
        return NextResponse.redirect(new URL("login", req.url))
    }
},{
    callbacks: {
        async authorized(){
            return true
        }
    }
})

export const config = {
    matcher: ['/', '/login', '/register']
}