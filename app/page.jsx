import TodoList from "@/components/TodoList"
import { prisma } from "@/services/auth/authenticate"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()
  console.log('session', session)
  if(!session){
    return redirect('/users/signin')
  }
  const user = await prisma.user.findUnique({where:{email:session?.user.email},select:{todos:true}})
  const todos = user?.todos
  return (
    <div className="h-screen container mx-auto px-4 mt-4" >
      <TodoList todoList={todos} />

    </div>
  )
}
