import TodoList from "@/components/TodoList"
import { prisma } from "@/services/auth/authenticate"
import moment from "moment"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()
  console.log('session', session)
  if(!session){
    return redirect('/users/signin')
  }
  const user = await prisma.user?.findUnique({where:{email:session?.user.email},select:{todos:{
    where: {
      OR: [
        { done: false},
        { createdAt: {gte: moment(new Date()).set({hour:0, minute:0})} }
      ]
    }
  }}
  }
  )
  const todos = user?.todos
  return (
    <div className="h-screen container mx-auto px-4 mt-4" >
      <TodoList todoList={todos} />

    </div>
  )
}

