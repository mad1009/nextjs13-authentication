'use client'

import {signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import {BsFillDoorClosedFill} from 'react-icons/bs'
function Navbar() {
    const links = [
        {display: "home", url:"/"},
        {display: "profile", url:"/users/profile"},
    ]

    const {data:session} = useSession()
  return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {links.map(item=>(
                    <li key={item.display}><Link href={item.url}>{item.display}</Link></li>        
                ))}
            </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl">TODOS</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            {links.map(item=>(
                    <li key={item.display}><Link href={item.url}>{item.display}</Link></li>        
                ))}
            </ul>
        </div>
        <div className="navbar-end">
            {session?.user ? (
                <>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={session?.user?.image ? session.user.image : 'https://www.w3schools.com/w3images/avatar5.png'} />
                        </div>
                    </div>
                    <span className='mx-3'>{session?.user?.name}</span>
                    <BsFillDoorClosedFill onClick={async ()=> await signOut({callbackUrl: "/users/signin"})}  className=' text-gray-600 mx-2 cursor-pointer ' />
                </>
            ):
            <>
                <Link className='btn btn-accent btn-sm' href={"/api/auth/signin"} >Login</Link>
                <div className="divider divider-horizontal ">OR</div>
                <Link className='btn btn-primary btn-sm' href={"/users/signup"} >Sign Up</Link>
            </>
            }
        </div>
    </div>

    )
}

export default Navbar