import connectToDB from "@/database/database";
import User from "@/model/userModel"; 
import { NextRequest, NextResponse } from "next/server";
import {hash} from "bcryptjs"

export const POST = async (req: NextRequest, res: NextResponse)=> {

    try{
        await connectToDB();

        const {email, username, password} = await req.json();
        
        const userExist = await User.findOne({email: email})

        if(userExist){
            return NextResponse.json({
                message: "User already existed."
            }, {status: 500, statusText: "User already existed."})
        } 

        const hashPassword = await hash(password, 10)
        await User.create({
            email: email,
            username: username,
            image: "",
            password: hashPassword
        })

        return NextResponse.json({
            message: "User created successfully"
        }, {status: 201})
    } 
    catch(e){
        return NextResponse.json({
            message: "Error creating user"
        }, {status: 500, statusText: "Error creating user!"})
    }
}