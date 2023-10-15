'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { BsCheck2, BsGear, BsPenFill, BsPencil, BsTrash, BsX } from 'react-icons/bs'

function TodoCard({todo, deleteTodo, markAsDone, updateTodo}) {
    const [currentTodo, setCurrentTodo] = useState(todo)
    const [editMode, setEditMode] = useState(false)
    
    const handleDelete = async function(){
        if(confirm('Are you sure ?')){
            try {
                const response = await axios.post('/api/todos/delete', todo)
                console.log('response', response.data)
                deleteTodo(todo)                    
            } catch (error) {
                if( error.response ){
                    console.log("error.response.data", error.response.data); // => the response payload 
                    alert(`Delete todo failed failed: ${error.response.data.error}`)
                }else{
                    console.log("Delete todo failed failed", error.message);
                    alert(`Delete todo failed failed: ${error.message}`)  
                }
            
            }
            }
    }
    
    const handleTodoStatus = async function(){
        try {
            const response = await axios.post('/api/todos/status', todo)
            console.log('response', response.data)
            markAsDone(todo)                    
        } catch (error) {
            if( error.response ){
                console.log("error.response.data", error.response.data); // => the response payload 
                alert(`State update failed: ${error.response.data.error}`)
            }else{
                console.log("State update failed", error.message);
                alert(`State update failed: ${error.message}`)  
            }
        
        }

    }

    const handleUpdateTodo = async function(){
        try {
            if(currentTodo.description == "" || currentTodo.title == "") return alert("Title and description are required");
            const response = await axios.post('/api/todos/update', currentTodo)
            console.log('response', response.data)
            setEditMode(false)                
            updateTodo(currentTodo)
        } catch (error) {
            if( error.response ){
                console.log("error.response.data", error.response.data); // => the response payload 
                alert(`Update failed: ${error.response.data.error}`)
            }else{
                console.log("Update failed", error.message);
                alert(`Update failed: ${error.message}`)  
            }
        
        }
    }
    
    return (

        <div className={`card w-full  lg:w-[350px] ${todo.done ? 'bg-teal-100' : 'glass'}`}>
        <div className="card-body">
            {editMode ? (
            <div className="form-control w-full max-w-xs">
                <input type="text" required placeholder="Todo Title" onChange={(e)=>setCurrentTodo({...currentTodo, title:e.target.value})} value={currentTodo.title} className="input input-bordered w-full max-w-xs" />
            </div>
            ):
            (
                <h2 className={`card-title ${todo.done ? 'line-through' : ''} `}>{todo.title}</h2>
            )}

            {editMode ? (
                <>
                    <div className="form-control w-full max-w-xs">
                        <input type="text" required placeholder="Todo Description" onChange={(e)=>setCurrentTodo({...currentTodo, description:e.target.value})} value={currentTodo.description} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <button onClick={(e)=>handleUpdateTodo(e)} className='btn btn-primary' >Submit</button>
                </>
            ):
            (
                <p>{todo.description}</p>
            )}

        <div className="card-actions justify-end">
            <button onClick={()=>setEditMode((val)=>!val)} className="btn btn-neutral  btn-sm rounded-md my-2"><BsGear /></button>
            <button onClick={(e)=>handleTodoStatus()} className={`btn ${todo.done ? 'btn-neutral' : 'btn-accent'} btn-sm rounded-md my-2`}>{todo.done ?<BsX /> : <BsCheck2 /> }</button>
            <button onClick={handleDelete}  className="btn btn-outline btn-error btn-sm rounded-md my-2"><BsTrash /></button>

        </div>
        </div>
    </div>

 
    )
}

export default TodoCard