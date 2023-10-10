import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma, signUp } from "@/services/auth/authenticate";


export async function POST(request) {
    const data = await request.json()
    console.log('data', data)
    const existUser =  await prisma.user.findUnique({where:{email:data.email}})
    console.log('existUser', existUser)
    if(existUser){
        return new NextResponse(JSON.stringify({error:"User with this email already exist"}), {status:409})
    }
    try {
        const user = await signUp(data)
        return new NextResponse(JSON.stringify(user),{status:201})

        
    } catch (error) {
        console.error(error)
        return new NextResponse(JSON.stringify({error:"Somthing went wrong"}), {status:500})
    }
}