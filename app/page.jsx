'use client'
import { signOut, useSession } from "next-auth/react"

export default function Home() {
  const {data:session} = useSession()
  return (
    <div className="h-screen flex items-center justify-center" >
      {session?.user ? (
         <>
         <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-24 rounded-full">
                  <img src={session?.user?.image ? session.user.image : 'https://www.w3schools.com/w3images/avatar5.png'} />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{session.user.name}</h2>
            <p>{session.user.email}</p>
            <div className="card-actions">
              <button className="btn btn-neutral" onClick={signOut} >Logout</button>
            </div>
          </div>
        </div>


         </>
      ):
      (
        <>
         <h1>You are not logged In</h1>
        </>
      )
      }
    </div>
  )
}
