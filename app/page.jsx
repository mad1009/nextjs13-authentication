'use client'
import TodoCard from "@/components/TodoCard"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const {data:session} = useSession()
  const router = useRouter()
  if(!session) return router.push('/users/signin')

  return (
    <div className="h-screen container mx-auto mt-4" >
        <h1 className="text-2xl font-semibold my-2" >My Todos</h1>
        <div>
          <button className="btn btn-primary my-2" >Add New Todo</button>

          <div className="px-3 my-2 flex gap-4 flex-wrap">
          <TodoCard todo={{title:"Do Homeworks", description:"Do math and physics"}} />
          <TodoCard todo={{title:"Do Homeworks", description:"Do math and physics"}} />
          <TodoCard todo={{title:"Do Homeworks", description:"Do math and physics"}} />
          <TodoCard todo={{title:"Do Homeworks", description:"Do math and physics"}} />


          </div>          
        </div>


    </div>
  )
}
