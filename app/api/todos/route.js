import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/auth/authenticate";
import { getServerSession } from "next-auth";
import moment from "moment";


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


export async function GET(request) {
    const session = await getServerSession()
    if(!session) return new NextResponse(JSON.stringify({error:"Unautaurized"}), {status:401})
    try {
        const searchParams = request.nextUrl.searchParams
        // TODO: refactor this spaguetti code
        const datesFilter = {}
        if(searchParams.get("startDate")){
            datesFilter.gte = moment(searchParams.get("startDate")).toISOString()
        }
        if(searchParams.get("endDate")){
            datesFilter.lte = moment(searchParams.get("endDate")).toISOString()
        }
        const filter = [
            {createdAt:datesFilter},
        ]
        if(searchParams.get("done") == "1" || searchParams.get("done") == "2"){
            filter.push({
                done: searchParams.get("done") == "1" ? true : false 
            })
        }
        console.log('filter', filter)
        const user = await prisma.user.findUnique({where:{email:session?.user.email}, select:{todos:{
            where:{
                AND:filter
            }
        }}})

        return new NextResponse(JSON.stringify(user?.todos), {status:200})
            
    } catch (error) {
        console.error(error)
        return new NextResponse(JSON.stringify({error:"Somthing went wrong"}), {status:500})
    }

}
