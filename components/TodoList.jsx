"use client"

import React, { useState } from 'react'
import TodoModal from './TodoModal'
import TodoCard from './TodoCard'

function TodoList({todoList}) {
    const [todos, setTodos] = useState(todoList)    
    
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

    return (
        <div >
            <h1 className="text-2xl font-semibold my-2" >My Todos</h1>
            <div>
            <TodoModal addNewTodo={addNewTodo} />
            <div className="px-3 my-2 flex flex-wrap gap-5 ">

                    {todos.map((todo)=>(
                        <TodoCard markAsDone={markAsDone} deleteTodo={deleteTodo}  key={todo.id} todo={todo} />
                    ))}
                </div>          
            </div>
        </div>

    )
}

export default TodoList