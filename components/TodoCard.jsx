'use client'
import React, { useState } from 'react'

function TodoCard({todo}) {
    console.log('todo', todo)
    return (

        <div className="card w-full  lg:w-[350px] glass">
        <div className="card-body">
        <h2 className="card-title">{todo.title}</h2>
        <p>{todo.description}</p>
        <div className="card-actions justify-end">
            <button className="btn btn-accent btn-sm rounded-md my-2">Mark As Done</button>
            <div className="divider divider-horizontal">OR</div> 
            <button className="btn btn-outline btn-error btn-sm rounded-md my-2">Delete</button>

        </div>
        </div>
    </div>

 
    )
}

export default TodoCard