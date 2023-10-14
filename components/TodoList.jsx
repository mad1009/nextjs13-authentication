"use client"

import React, { useState } from 'react'
import TodoModal from './TodoModal'
import TodoCard from './TodoCard'

function TodoList({todoList}) {
    const [todos, setTodos] = useState(todoList)
    return (
        <div className="h-screen container mx-auto mt-4" >
            <h1 className="text-2xl font-semibold my-2" >My Todos</h1>
            <div>
            <TodoModal />
            <div className="px-3 my-2 flex flex-wrap gap-5 ">

                    {todos.map((todo)=>(
                        <TodoCard key={todo.id} todo={todo} />
                    ))}
                </div>          
            </div>
        </div>

    )
}

export default TodoList