"use client"

import React, { useEffect, useRef, useState } from 'react'
import TodoModal from './TodoModal'
import TodoCard from './TodoCard'
import axios from 'axios'
import { BsSearch } from 'react-icons/bs'
import { FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

function TodoList({todoList}) {
    const [todos, setTodos] = useState(todoList)    
    const [filtredTodos, setFiltredTodos] = useState(todoList)    
    
    const [filterStartDate, setFilterStartDate] = useState(new Date().toISOString().split('T')[0])
    const [filterEndDate, setFilterEndDate] = useState('')
    const [filterStatus, setFilterStatus] = useState('0')
    const [filterLoading, setFilterLoading] = useState(false)
    const formFilterRef = useRef()

    const [hideDone, setHideDone] = useState(false)

    const handleFilterForm = async (e)=>{
        e.preventDefault()
        const form = formFilterRef.current;
        const formData = new FormData(form);
        let search = new URLSearchParams(formData);
        
        try {
            e.preventDefault()
            setFilterLoading(true)
            const response = await axios.get(`/api/todos?${search}`)
            setTodos(response.data)
            toast.success("Filtred successfully", {position:'bottom-right'})
        } catch (error) {
            if( error.response ){
                console.log("error.response.data", error.response.data); // => the response payload 
                toast.error(`Filter todos failed: ${error.response.data.error}`,{position:'bottom-right'})
            }else{
                console.log("Filter todos failed", error.message);
                toast.error(`Filter todos failed: ${error.message}`,{position:'bottom-right'})
            }
        
        } finally {
            setFilterLoading(false)
        }




    }

    const addNewTodo = (todo)=>{
        setTodos(data=>[...data, todo])
    }
    
    const deleteTodo = (todo)=>{
        const newTodos = todos.filter(t=>t.id != todo.id)
        setTodos(newTodos)
    }

    const markAsDone = function(todo){
        const updatedTodos = todos.map(td=>{
            if(td.id == todo.id){td.done = !todo.done}
            return td
        })
        setTodos(updatedTodos)
    }

    const updateTodo = function(todo){
        const updatedTodos = todos.map(td=>{
            if(td.id == todo.id){td=todo}
            return td
        })
        setTodos(updatedTodos)
    }
    useEffect(() => {
        console.log("updated")
        todoList = todos
        handleShowSwitch()
    
    }, [todos])
    
    useEffect(() => {
        handleShowSwitch()
    }, [hideDone])
    
    const handleShowSwitch = ()=>{
        if(hideDone == true){
            const filtred = todos.filter(t=>t.done !== true)
            console.log('filtred', filtred)
            setFiltredTodos(filtred)

        }else{
            const filtred = todos
            setFiltredTodos(filtred)
        }
    }
    if(!todos){
        return (
            <div className='min-h-screen flex items-center justify-center' >
                <p className='text-center text-3xl font-mono flex-1 ' >Somthing went wrong please logout and try again</p>
            </div>
        )

    }
    return (
        <div >
            <div className='my-8'>
                <span className="text-5xl font-semibold " >My Todos</span>
                <span className="text-sm font-light mx-2" >({todos.length ?? 0} todos)</span>
            </div>
            <div>
                <form ref={formFilterRef} onSubmit={handleFilterForm} className=" bg-white rounded-md p-3 flex  justify-around items-center flex-col lg:flex-row">
                    <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">Start Date</span>
                        </label>
                        <input type="date" name="startDate" required onChange={(e)=>setFilterStartDate(e.target.value)} value={filterStartDate}  className="input input-bordered max-w-sm " />
                        </div>
                        <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">End Date</span>
                        </label>
                        <input type="date" name="endDate"  onChange={(e)=>setFilterEndDate(e.target.value)} value={filterEndDate}   className="input input-bordered max-w-sm " />
                    </div>
                    <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select name='done' required onChange={(e)=>setFilterStatus(e.target.value)} value={filterStatus}   className="input input-bordered max-w-sm " >
                            <option value="0">All</option>
                            <option value="1">Done</option>
                            <option value="2">Not Done</option>
                        </select>
                    </div>
                    <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">  </span>
                        </label>
                    <button className='btn btn-primary' disabled={filterLoading} >{filterLoading ? (<FaSpinner className='animate-spin' />) : <BsSearch />}</button>
                    </div>
                </form>
                
            <div className='p-3 flex justify-around items-center' >
            <TodoModal addNewTodo={addNewTodo} />
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input type="checkbox" className="toggle toggle-success" checked={hideDone} onChange={(e)=>{setHideDone(val=>!val); console.log('hideDone', hideDone)}} />
                    <span className="label-text mx-2">Hide Done</span> 
                </label>
            </div>


            </div>
            <div className="px-3 my-2 flex flex-wrap gap-5 ">
                {filtredTodos.length > 0 ? (
                    <>
                    {filtredTodos.map((todo)=>(
                        <TodoCard updateTodo={updateTodo} markAsDone={markAsDone} deleteTodo={deleteTodo}  key={todo.id} todo={todo} />
                    ))}
                    </>
                ):(
                    <div className='h-40 flex items-center justify-center w-full'>
                        <p className='text-center text-2xl font-mono flex-1' >No todos for found</p>
                    </div>
                )}

                </div>          
            </div>

        </div>

    )
}

export default TodoList