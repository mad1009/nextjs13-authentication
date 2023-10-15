'use client'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function SignInPage() {
    const router = useRouter()
    const {data:session} = useSession()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const login = async (e)=>{
        try {
            e.preventDefault()
            const loggedIn = await signIn('credentials',{
                email,
                password,
                redirect:false,
            })
            if(loggedIn.error){
                
                loggedIn.error == "CredentialsSignin" ? setError("Invalid credentials") : setError(loggedIn.error)
            }else{
                router.push('/')
            }
        } finally {
            setLoading(false)
        }

    }

    if(session) return router.push('/')
  
    return (
    <div className="h-screen flex items-center justify-center" >
         <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-24 rounded-full">
              <img src='https://www.w3schools.com/w3images/avatar5.png'/>
              </div>
            </div>

          </figure>
          <form onSubmit={(e)=>login(e)} className="card-body ">
          <h1 className='text-xl font-bold text-center'>Sign In</h1>
        
            {error && 
            <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
            </div>
            }
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email*</span>
                </label>
                <input type="email" required placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} value={email} className="input input-bordered w-full max-w-xs" />
            </div>


            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Password*</span>
                </label>
                <input type="password" required placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password} className="input input-bordered w-full max-w-xs" />
            </div>

            <button className='btn btn-success w-full' disabled={loading} >{loading ? 'Loading...' : 'Submit'}</button>
            <div className="divider divider-vertical ">OR</div>

            <button type='button' className='btn btn-neutral my-2' onClick={() => signIn('github')}>
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width={30} />
                Sign in with Github
            </button>

            <button type='button' className='btn btn-neutral my-2' onClick={() => signIn('google')}>
                <img src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png" width={30} />
                Sign in with Google (test mode)
            </button>


          </form>
        </div>

    </div>
  )
}

export default SignInPage