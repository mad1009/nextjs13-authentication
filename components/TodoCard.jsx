'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { BsCheck2, BsGear,  BsTrash, BsX } from 'react-icons/bs'
import Moment from 'moment';
import { FaSpinner } from 'react-icons/fa';

function TodoCard({todo, deleteTodo, markAsDone, updateTodo}) {
    const [currentTodo, setCurrentTodo] = useState({...todo, delivryTime:Moment(todo.delivryTime).format('YYYY-MM-DDTHH:mm')})
    const [editMode, setEditMode] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [loadingState, setLoadingState] = useState(false)
    Moment.locale('en');

    const handleDelete = async function(){
        if(confirm('Are you sure ?')){
            try {
                setLoadingDelete(true)
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
            
            }finally{
                setLoadingDelete(false)
            }
            }
    }
    
    const handleTodoStatus = async function(){
        try {
            setLoadingState(true)
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
        
        }finally{
            setLoadingState(false)
        }

    }

    const handleUpdateTodo = async function(){
        try {
            if(currentTodo.description == "" || currentTodo.title == "") return alert("Title and description are required");
            setLoadingEdit(true)
            const response = await axios.post('/api/todos/update', {...currentTodo, delivryTime:Moment(currentTodo.delivryTime).toISOString()})
            console.log('response', response.data)
            setEditMode(false)                
            updateTodo(response.data)
        } catch (error) {
            if( error.response ){
                console.log("error.response.data", error.response.data); // => the response payload 
                alert(`Update failed: ${error.response.data.error}`)
            }else{
                console.log("Update failed", error.message);
                alert(`Update failed: ${error.message}`)  
            }
        
        }finally{
            setLoadingEdit(false)
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
                <>
                <h2 className={`card-title ${todo.done ? 'line-through' : ''} `}>{todo.title}</h2>
                {todo.delivryTime && (
                    <p className='text-sm font-light italic text-red-600' >Deadline: {Moment(todo.delivryTime).format('D MMM Y H:M')}</p>
                )}
                </>
            )}

            {editMode ? (
                <>
                    <div className="form-control w-full max-w-xs">
                        <input type="text" required placeholder="Todo Description" onChange={(e)=>setCurrentTodo({...currentTodo, description:e.target.value})} value={currentTodo.description} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input type="datetime-local"  onChange={(e)=>setCurrentTodo({...currentTodo, delivryTime:e.target.value})} value={currentTodo.delivryTime} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <button onClick={(e)=>handleUpdateTodo(e)} className='btn btn-primary' disabled={loadingEdit} >{loadingEdit ? (<FaSpinner className='animate-spin' />) : 'Submit'}</button>
                </>
            ):
            (
                <p>{todo.description}</p>
            )}
            <div className='d-flex flex-col'>
                <p className='text-sm font-light italic' >created at: {Moment(todo.createdAt).format('D MMM Y H:M')}</p>
                {todo.updatedAt !== todo.createdAt && (
                    <p className='text-sm font-light italic' >updated at: {Moment(todo.updatedAt).format('D MMM Y H:M')}</p>
                )}
            </div>
        <div className="card-actions justify-end">
            <button onClick={()=>setEditMode((val)=>!val)} className="btn btn-neutral  btn-sm rounded-md my-2"><BsGear /></button>
            <button onClick={(e)=>handleTodoStatus()} className={`btn ${todo.done ? 'btn-neutral' : 'btn-accent'} btn-sm rounded-md my-2`} disabled={loadingState} >{loadingState ? (<FaSpinner className='animate-spin' />):(<> {todo.done ?<BsX /> : <BsCheck2 /> } </>)}</button>
            <button onClick={handleDelete}  className="btn btn-outline btn-error btn-sm rounded-md my-2" disabled={loadingDelete}>{loadingDelete ? (<FaSpinner className='animate-spin' />):(<BsTrash />)}</button>

        </div>
        </div>
    </div>

 
    )
}

export default TodoCard