'use client'
import React, { useState } from 'react'

function TodoCard({todo}) {
    return (

        <div className="card sm:w-full md:w-96 glass">
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