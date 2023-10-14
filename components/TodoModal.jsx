'use client'
import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react'
import { BsPlus } from 'react-icons/bs';

function TodoModal({addNewTodo}) {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const ref = useRef();
    const closeBtnRef = useRef();

    const handleShow = useCallback(() => {
        ref.current?.showModal();
      }, [ref]);
    
    const createTodo = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('/api/todos', {title, description})
            console.log('response', response.data)
            addNewTodo(response.data)
            setTitle('')
            setDescription('')
            closeBtnRef.current?.click()
                
        } catch (error) {
            if( error.response ){
                console.log("error.response.data", error.response.data); // => the response payload 
                alert(`Sign Up failed: ${error.response.data.error}`)
            }else{
                console.log("Sign Up failed", error.message);
                alert(`Sign Up failed: ${error.message}`)  
            }
        
        }

    }

    return (
        <>
            <button className="btn btn-accent my-2" onClick={()=>handleShow()}><BsPlus size={24} />  Todo</button>
            <dialog ref={ref} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button ref={closeBtnRef} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg my-2">New Todo</h3>


                    <form onSubmit={createTodo}>
                        <div className="form-control my-2 w-full ">
                            <label className="label">
                                <span className="label-text">Title*</span>
                            </label>
                            <input type="text" required placeholder="Task Title" onChange={(e)=>setTitle(e.target.value)} value={title} className="input input-bordered w-full " />
                        </div>
                        <div className="form-control my-2 w-full ">
                            <label className="label">
                                <span className="label-text">Description*</span>
                            </label>
                            <input type="text" required placeholder="Describe your task" onChange={(e)=>setDescription(e.target.value)} value={description} className="input input-bordered w-full " />
                        </div>
                        <button className='btn btn-neutral float-right'>Submit</button>
                    </form>

                    
                </div>
            </dialog>

        </>
    )
}

export default TodoModal