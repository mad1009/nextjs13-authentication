import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { exclude, prisma } from "@/services/auth/authenticate";
import { getServerSession } from "next-auth";


export async function POST(request) {
    const session = await getServerSession()
    if(!session) return new NextResponse(JSON.stringify({error:"Unautaurized"}), {status:401})
    try {
        const data = await request.json()
        console.log('data', data)
        const user = await prisma.user.findUnique({where:{email:session?.user.email}})
        if(!user) {throw new Error('User not found')}
        const updatedUser = await prisma.user.update({where:{
            email: session?.user.email
        },data:{
            name:data.name,
            image:data.image,
        }})
        
        console.log('updatedUser', updatedUser)
        return new NextResponse(JSON.stringify(exclude(updatedUser, ['password'])), {status:200})
            
    } catch (error) {
        console.error(error)
        return new NextResponse(JSON.stringify({error:"Somthing went wrong"}), {status:500})
    }

}