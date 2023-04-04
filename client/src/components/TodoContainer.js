import React, {useEffect, useState, useRef} from 'react'
import {AiOutlineCheck} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlinePlus} from 'react-icons/ai'

const API_BASE = "http://localhost:5000"

const TodoContainer = () => {

const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState(" ");
const ref = useRef(null);

useEffect(() => {
  getTodos();
  console.log(todos)
})

const getTodos = () => {
    fetch(API_BASE + "/todos")
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.error("error: ", err));
}
    const completeTodo = async id => {
        const data = await fetch(API_BASE + "/todos/complete/" + id)
        .then(res => res.json());
        
        setTodos(todos => todos.map(todo => {
           if(todo._id === data._id){
                todo.complete = data.complete;
           } 
           return todo;
        }))
    }

    const removeTodo = async id => {
        const data = await fetch(API_BASE + "/todos/delete/" + id, {method: "DELETE"})
            .then(res => res.json());
        
        setTodos(todos => todos.filter(todo => todo._id !== data._id));
        
    }

    const addTodo = async () => {
        const data = await fetch(API_BASE + "/todos/new/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo 
            })
        }).then(res => res.json())
        setTodos([...todos, data]);
        setNewTodo("");
        ref.current.value = ""
    }

    return (
        <div id='Todo-container' className=' flex flex-row justify-center items-center w-full '>
            
            <div className='flex flex-col w-full'>
                <div className='flex flex-row w-full bg-black-200/40 mb-2'>
                    <div className='w-full flex justify-start items-start'>
                        <input ref={ref} className='w-full h-full bg-transparent focus:outline-none text-white pl-2 py-2' onChange={(e) => setNewTodo(e.target.value)}/>
                    </div>
                    <div className='flex items-center justify-center pr-0 py-2'>
                        <button className='flex items-center justify-center py-1 px-1 text-white font-thin rounded-3xl w-[30px] h-[30px] mx-4 bg-gradient-to-br from-purple-600 via-purple-800 to-purple-600 hover:bg-gradient-to-br hover:from-purple-600 hover:via-purple-500 hover:to-purple-600' onClick={() => addTodo()}><AiOutlinePlus/></button>
                    </div>
                </div>
                {
                todos.map(todo => (
                    <div className='flex flex-row w-full bg-black-200/40 my-2' key={todo._id} >
                        <div className='w-full flex justify-start items-center pl-4'>
                            <p className={'text-white font-thin' + (todo.complete ? "text-white font-thin line-through": "text-white font-thin")}>{todo.text}</p>
                        </div>
                        <div className='flex items-center justify-center pr-0 py-2'>
                            <button className='flex items-center justify-center py-1 px-1 cursor-pointer rounded-sm  text-white font-thin w-[50px] h-[20px] mx-2 bg-gradient-to-br from-green-600 via-green-500 to-green-600 hover:bg-gradient-to-br hover:from-green-600 hover:via-green-400 hover:to-green-600' onClick={() => completeTodo(todo._id)}><AiOutlineCheck/></button>
                            <button className='flex items-center justify-center py-1 px-1 cursor-pointer rounded-sm  text-white font-thin w-[50px] h-[20px] mx-2 bg-gradient-to-br from-orange-600 via-red-600 to-orange-600 hover:bg-gradient-to-br hover:from-red-600 hover:via-red-500 hover:to-red-600' onClick={() => removeTodo(todo._id)}><AiOutlineClose/></button>
                        </div>
                    </div>
                ))}
                </div>
        </div>
  )
}

export default TodoContainer