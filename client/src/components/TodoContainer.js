import React, {useEffect, useState, useRef} from 'react'
import {AiOutlineCheck, AiOutlineClose} from 'react-icons/ai'
import {TbCirclePlus} from 'react-icons/tb'
import axios from 'axios'
const TodoContainer = () => {
    const [todos, setTodos] = useState([]);
    const ref = useRef(null);
    const textRef = useRef(null)
    const [todo, setTodo] = useState({text:"", time:"", link:""})
    
    const handleInput = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value,
        });
    };
    
    const addTodo = async (e) => {
        e.preventDefault()
        try{
            axios.post(process.env.REACT_APP_BASE_URL + "/api/todos/new", {
                text: todo.text,
                time: todo.time,
                link: todo.link
            })
            .then((response) => {
                console.log(response);
                ref.current.value = "";
                textRef.current.value = ""
              });
        }catch(error){
            console.log(error)
            console.log(todo)
        }
    
    }

    const getTodos = () => {
        fetch(process.env.REACT_APP_BASE_URL + "/api/todos")
            .then(res => res.json())
            .then(data => {
                setTodos(data)})
            .catch(err => console.error("error: ", err));
    }
    
    const completeTodo = async id => {
        const data = await fetch(process.env.REACT_APP_BASE_URL + "/api/todos/complete/" + id)
        .then(res => res.json());
        
        setTodos(todos => todos.map(todo => {
           if(todo._id === data._id){
                todo.complete = data.complete;
           } 
           return todo;
        }))
    }

    const removeTodo = async id => {
        const data = await fetch(process.env.REACT_APP_BASE_URL + "/api/todos/delete/" + id, {method: "DELETE"})
            .then(res => res.json());
        
        setTodos(todos => todos.filter(todo => todo._id !== data._id));
        
    }



    useEffect(() => {
        getTodos();
    },[todos])
    return (
        <div id='Todo-container' className='flex flex-row justify-center items-center w-full'>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row w-full h-full bg-black-200/40'>
                    <form onSubmit={addTodo} className='w-full h-full flex flex-row justify-start items-start'>
                        <div className='flex flex-col w-[90%]'>
                            <input 
                                ref={textRef} 
                                className='border-[1px] border-black-50 w-full h-full bg-transparent focus:outline-none text-white pl-2 py-2' 
                                onChange={handleInput}
                                type='text'
                                placeholder='Todo'
                                name='text'
                            />
                            <div className='flex flex-row'>
                                <input 
                                    ref={ref} 
                                    className='border-[1px] border-black-50 w-full h-full bg-transparent focus:outline-none text-white pl-2 py-2' 
                                    onChange={handleInput}
                                    type='time'
                                    name='time'
                                />
                                <input 
                                    ref={ref} 
                                    className='border-[1px] border-black-50 w-full h-full bg-transparent focus:outline-none text-white pl-2 py-2' 
                                    onChange={handleInput}
                                    type='link'
                                    placeholder='Link'
                                    name='link'
                                />  
                            </div>

                        </div>
                        <div className='flex items-center justify-center w-[10%]'>
                            <div className='h-full w-full flex justify-center items-center'>
                                <button className='w-full h-full flex justify-center items-center'><TbCirclePlus className='text-4xl text-purple-600 hover:text-purple-700 cursor-pointer w-full h-full p-2'/></button>
                            </div>
                        </div>
                    </form>

                </div>
                {
                todos.map(todo => (
                    <div className='flex flex-row w-full bg-black-200/40 my-2' key={todo._id} >
                        <div className='w-full flex justify-start items-center pl-4'>
                            <p className={'text-white md:text-[20px] text-[25px] font-thin' + (todo.complete ? "text-white font-thin line-through": "text-white font-thin")}>{todo.text}</p>
                        </div>
                        <div className='flex items-center justify-center pr-0 py-2'>
                            <button className='flex items-center justify-center py-1 px-1 md:h-[20px] cursor-pointer rounded-md text-white font-thin w-[50px] h-[28px] mx-2 bg-gradient-to-br from-green-600 via-green-500 to-green-600 hover:bg-gradient-to-br hover:from-green-600 hover:via-green-400 hover:to-green-600' onClick={() => completeTodo(todo._id)}><AiOutlineCheck/></button>
                            <button className='flex items-center justify-center py-1 px-1 md:h-[20px] cursor-pointer rounded-md text-white font-thin w-[50px] h-[28px] mx-2 bg-gradient-to-br from-orange-600 via-red-600 to-orange-600 hover:bg-gradient-to-br hover:from-red-600 hover:via-red-500 hover:to-red-600' onClick={() => removeTodo(todo._id)}><AiOutlineClose/></button>
                        </div>
                    </div>
                ))}
                </div>
        </div>
  )
}

export default TodoContainer