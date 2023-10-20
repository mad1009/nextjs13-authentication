'use client'
import ProfileModal from '@/components/EditProfileModal'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function ProfilePage() {
    const {data:session} = useSession()
    const router = useRouter()
    if(!session) return router.push('/users/signin')
  
    return (
        <div className="h-screen flex items-center justify-center" >
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
                    <ProfileModal user={session?.user} />
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProfilePage