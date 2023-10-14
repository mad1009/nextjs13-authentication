'use client'
import React, { useCallback, useRef, useState } from 'react'

function TodoModal() {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const ref = useRef();

    const handleShow = useCallback(() => {
        ref.current?.showModal();
      }, [ref]);
    
    return (
        <>
            <button className="btn btn-success" onClick={()=>handleShow()}>New Todo</button>
            <dialog ref={ref} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg my-2">New Todo</h3>


                    <form>
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