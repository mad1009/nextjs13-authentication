import { prisma } from "@/services/auth/authenticate"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request) {
    console.log('request', request)
    const session = await getServerSession()
    if(!session) return new NextResponse(JSON.stringify({error:"Unautaurized"}), {status:401})
    try {
        const data = await request.json()
        console.log('data', data)
        const user = await prisma.user.findUnique({where:{email:session?.user.email}})

        if(data.userId != user.id) return new NextResponse(JSON.stringify({error:"Unauthorized"}), {status:401})
        
        const updatedTodo = await prisma.todo.update(
            {
                where:{id:data.id},
                data:{
                    title: data.title,
                    description: data.description,
                    delivryTime: data.delivryTime,
                }
            }
            )
        console.log('updatedTodo', updatedTodo)
        return new NextResponse(JSON.stringify(updatedTodo), {status:200})
            
    } catch (error) {
        console.error(error)
        return new NextResponse(JSON.stringify({error:"Somthing went wrong"}), {status:500})
    }

}