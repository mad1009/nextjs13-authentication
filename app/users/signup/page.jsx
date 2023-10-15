'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function SignUpPage() {
    const router = useRouter()
    const {data:session} = useSession()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const signup = async (e)=>{
        try {
            e.preventDefault()
            setLoading(true)
            const response = await axios.post('/api/users/signup',{name, email, password, image})
            console.log(response.data)
            router.push('/users/signin')         
        } catch (error) {
            if( error.response ){
                console.log("error.response.data", error.response.data); // => the response payload 
                alert(`Sign Up failed: ${error.response.data.error}`)
            }else{
                console.log("Sign Up failed", error.message);
                alert(`Sign Up failed: ${error.message}`)  
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
          <form onSubmit={(e)=>signup(e)} className="card-body ">
          <h1 className='text-xl font-bold text-center'>Sign Up</h1>
            
          <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Full Name</span>
            </label>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter your name" className="input input-bordered w-full max-w-xs" />
        </div>

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

        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Image Url</span>
            </label>
            <input type="url"  placeholder="Enter your image url" onChange={(e)=>setImage(e.target.value)} value={image} className="input input-bordered w-full max-w-xs" />
        </div>

        <button className='btn btn-success w-full' disabled={loading} >{loading ? 'Loading...' : 'Submit'}</button>

          </form>
        </div>
    </div>
  )
}

export default SignUpPage