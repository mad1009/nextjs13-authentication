import TodoCard from "@/components/TodoCard"
import TodoList from "@/components/TodoList"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()
  if(!session){
    return redirect('/users/signin')
  }
  console.log('session', session)
  const todos = await new Promise((resolve, reject)=>{
    return resolve([
      {id:"1",title:"Do Homeworks", description:"Do math and physics"},
      {id:"2",title:"Do Homeworks", description:"Do math and physics"},
      {id:"3",title:"Do Homeworks", description:"Do math and physics"},
      {id:"4",title:"Do Homeworks", description:"Do math and physics"},
      {id:"5",title:"Do Homeworks", description:"Do math and physics"},
      {id:"6",title:"Do Homeworks", description:"Do math and physics"},
    ])
  })
  console.log('todos', todos)
  return (
    <div className="h-screen container mx-auto mt-4" >
      <TodoList todoList={todos} />

    </div>
  )
}
