"use client"

import React, { useEffect, useState } from 'react'
import TodoModal from './TodoModal'
import TodoCard from './TodoCard'

function TodoList({todoList}) {
    const [todos, setTodos] = useState(todoList)    
    const [filtredTodos, setFiltredTodos] = useState(todoList)    
    
    const [filterStartDate, setFilterStartDate] = useState(new Date().toISOString().split('T')[0])
    const [filterEndDate, setFilterEndDate] = useState('')
    const [filterStatus, setFilterStatus] = useState('0')
    
    const [hideDone, setHideDone] = useState(false)

    const addNewTodo = (todo)=>{
        setTodos(data=>[...data, todo])
        setFiltredTodos(data=>[...data, todo])
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
    
    }, [todos])
    
    useEffect(() => {
        if(hideDone == true){
            const filtred = todos.filter(t=>t.done !== true)
            setFiltredTodos(filtred)
        }else{
            const filtred = todos
            setFiltredTodos(filtred)
        }
    }, [hideDone])
    


    return (
        <div >
            <h1 className="text-3xl font-semibold my-4" >My Todos</h1>
            <div>
                <div className=" glass p-3 flex  justify-around items-center flex-col lg:flex-row">
                    <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">Start Date</span>
                        </label>
                        <input type="date" required onChange={(e)=>setFilterStartDate(e.target.value)} value={filterStartDate}  className="input input-bordered max-w-sm " />
                        </div>
                        <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">End Date</span>
                        </label>
                        <input type="date"  onChange={(e)=>setFilterEndDate(e.target.value)} value={filterEndDate}   className="input input-bordered max-w-sm " />
                    </div>
                    <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select onChange={(e)=>setFilterStatus(e.target.value)} value={filterStatus}   className="input input-bordered max-w-sm " >
                            <option value="0">All</option>
                            <option value="1">Done</option>
                            <option value="2">Not Done</option>
                        </select>
                    </div>
                    <div className="form-control my-2 max-w-sm ">
                        <label className="label">
                            <span className="label-text">  </span>
                        </label>
                    <button className='btn btn-primary' >Search</button>
                    </div>
                </div>
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
                {filtredTodos ? (
                    <>
                    {filtredTodos.map((todo)=>(
                        <TodoCard updateTodo={updateTodo} markAsDone={markAsDone} deleteTodo={deleteTodo}  key={todo.id} todo={todo} />
                    ))}
                    </>
                ):(
                    <p className='text-center text-2xl font-mono flex-1' >No todos for today</p>
                )}

                </div>          
            </div>
        </div>

    )
}

export default TodoList