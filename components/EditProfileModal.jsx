'use client'
import axios from 'axios';
import Moment from 'moment';
import React, { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { BsGear, BsPlus } from 'react-icons/bs';
import { FaSpinner, FaUser } from 'react-icons/fa';

function ProfileModal({user}) {
    
    const [name, setName] = useState(user?.name)    
    const [image, setImage] = useState(user?.image)    
    const [loading, setLoading] = useState(false)

    const ref = useRef();
    const closeBtnRef = useRef();

    const handleShow = useCallback(() => {
        ref.current?.showModal();
      }, [ref]);
    
    const editUser = async (e)=>{
        try {
            e.preventDefault()
            setLoading(true)
            const response = await axios.post('/api/users/edit', {name, image})
            console.log('response', response.data)
            // update session data
            closeBtnRef.current?.click()
            toast.success('Saved successfully\nplease login again to see changes',{position:'bottom-right', duration:10000})
        } catch (error) {
            if( error.response ){
                toast.error(`failed to save user data: ${error.response.data.error}`,{position:'bottom-right'})
                alert(`Update failed: ${error.response.data.error}`)
            }else{
                console.log("Update failed", error.message);
                toast.error(`failed to save user data: ${error.message}`,{position:'bottom-right'})
            }
        
        }finally{
            setLoading(false)
        }

    }


    return (
        <>
            <button className="btn btn-accent my-2" onClick={()=>handleShow()}><BsGear size={24} />  Edit</button>
            <dialog ref={ref} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button ref={closeBtnRef} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg my-2">Edit Profile</h3>


                    <form onSubmit={editUser} >
                        <div className="form-control my-2 w-full ">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" required placeholder="Enter your full name" onChange={(e)=>setName(e.target.value)} value={name} className="input input-bordered w-full " />
                        </div>
                        <div className="form-control my-2 w-full ">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input type="url"  placeholder="Enter your image" onChange={(e)=>setImage(e.target.value)} value={image} className="input input-bordered w-full " />
                        </div>
                        <button disabled={loading} className='btn btn-neutral float-right'>{loading ? (<FaSpinner className='animate-spin' />) : 'Submit'}</button>
                    </form>
                </div>
            </dialog>

        </>
    )
}

export default ProfileModal