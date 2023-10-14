import { NextResponse } from "next/server";
import { prisma } from "@/services/auth/authenticate";
import { getServerSession } from "next-auth";


export async function POST(request) {
    const session = await getServerSession()
    if(!session) return new NextResponse(JSON.stringify({error:"Unautaurized"}), {status:401})
    try {
        const data = await request.json()
        console.log('data', data)
        const user = await prisma.user.findUnique({where:{email:session?.user.email}})
        const newTodo = await prisma.todo.create({data:{...data, userId:user.id}})
        return new NextResponse(JSON.stringify(newTodo), {status:200})
            
    } catch (error) {
        console.error(error)
        return new NextResponse(JSON.stringify({error:"Somthing went wrong"}), {status:500})
    }

}
