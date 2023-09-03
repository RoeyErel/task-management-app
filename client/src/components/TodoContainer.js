import React, {useEffect, useState, useRef} from 'react'
import {AiOutlineCheck, AiOutlineClose, AiOutlineClockCircle, AiOutlineLink} from 'react-icons/ai'
import {TbCirclePlus} from 'react-icons/tb'
import axios from 'axios'
const TodoContainer = () => {
    const [todo, setTodo] = useState({text:"", time:"", link:""})
    const [todos, setTodos] = useState([]);
    const [newLink, setNewLink] = useState("")
    const ref = useRef(null);
    const textRef = useRef(null)

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
        }
    
    }

    const getTodos = () => {
        fetch(process.env.REACT_APP_BASE_URL + "/api/todos")
            .then(res => res.json())
            .then(data => {
                setTodos(data)})
            .catch(err => console.error("error: ", err));
    }

    const editLink = async (e, id, link) => {
        e.preventDefault()
        try{
            await axios.post(process.env.REACT_APP_BASE_URL + "/api/todos/editLink/" + id,{
                link: link
            })
            .then((response) => {
                console.log(response);
              });
        }catch(err){
            console.error(err)
        }
        
        
    }
    //edit time
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
        <div id='Todo-container' className='flex flex-row justify-center items-center w-full h-[20%]'>
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row w-full h-full bg-black-200/40 mb-1'>
                    <form onSubmit={addTodo} className='w-full h-full flex flex-row justify-start items-start'>
                        <div className='flex flex-col w-[90%]'>
                            <input name='text' required ref={textRef} className='border-[1px] border-black-50/60 w-full h-full bg-transparent focus:outline-none text-white pl-2 py-2 text-xl' onChange={handleInput} type='text' placeholder='Todo'/>
                            <div className='flex flex-row w-full h-full'>
                                <input name='time' required ref={ref} className='w-[25%] sm:w-[50%] border-[1px] border-black-50/60 h-full bg-transparent focus:outline-none text-white pl-2 py-2 text-xl' onChange={handleInput} type='time'/>
                                <input name='link' ref={ref} className='border-[1px] border-black-50/40 w-[75%] sm:w-[50% h-full bg-transparent focus:outline-none text-white pl-2 py-2 text-xl' onChange={handleInput} type='link' placeholder='Link'/>
                            </div>
                        </div>
                        <div className='w-[10%] h-full'>
                            <div className='h-[100%] w-full flex justify-center items-center'>
                                <button className='w-full h-full flex justify-center items-center text-3xl cursor-default'><TbCirclePlus className='text-white hover:text-gray-300 cursor-pointer'/></button>
                            </div>
                        </div>
                    </form>

                </div>
                
                {todos.map(todo => (
                    <div className='flex flex-row w-full bg-black-200/40 my-1' key={todo._id} >
                        <div className='w-full flex sm:flex-col justify-between items-center px-2 md:px-2'>
                            <div className='flex justify-start sm:justify-center items-center w-[75%]'>
                                <p className={'text-white md:text-[18px] text-[22px] sm:text-[18px] font-thin flex justify-center items-center' + (todo.complete ? "text-white font-thin line-through": "text-white font-thin")}>{todo.text}</p>
                            </div>
                            <div className='flex justify-end sm:justify-center items-center w-[25%]'>
                                <button className='flex justify-center items-center'>
                                    {todo.link?
                                        <div className='flex justify-center items-center'>
                                            <AiOutlineLink className='mx-1 text-white text-[18px] md:text-[16px] sm:text-[15px]'/>
                                            <a className='text-white flex justify-center items-center text-[18px] md:text-[16px] sm:text-[15px] ' rel="noreferrer" target="_blank" href={'https://'+(todo.link)}>Link</a>
                                        </div>
                                    :
                                        <div className='flex justify-center items-center'>
                                            <AiOutlineLink onClick={(e) => editLink(e, todo._id, newLink)} className='mx-1 text-white text-[18px] md:text-[16px] sm:text-[15px]'/>
                                            <input onChange={(e)=> setNewLink(e.target.value)} className='w-10 pl-1 bg-transparent flex justify-center items-center text-white text-[18px] md:text-[16px] sm:text-[15px]' placeholder='Edit'/>
                                        </div>
                                    } 
                                </button>
                                <p className='text-white flex justify-end items-center pl-4 text-[18px] md:text-[16px] sm:text-[15px] '><AiOutlineClockCircle className='mx-1'/>{todo.time}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-center pr-0 py-2'>
                            <button className='flex items-center justify-center py-1 px-1 md:px-1 md:h-[20px] cursor-pointer rounded-md text-white font-thin w-[50px] sm:w-[30px] md:w-[30px] h-[28px] mx-2 md:mx-[2px] bg-gradient-to-br from-green-600 via-green-500 to-green-600 hover:bg-gradient-to-br hover:from-green-600 hover:via-green-400 hover:to-green-600' onClick={() => completeTodo(todo._id)}><AiOutlineCheck/></button>
                            <button className='flex items-center justify-center py-1 px-1 md:px-1 md:h-[20px] cursor-pointer rounded-md text-white font-thin w-[50px] sm:w-[30px] md:w-[30px] h-[28px] mx-2 md:mx-[2px] md:mr-1 bg-gradient-to-br from-orange-600 via-red-600 to-orange-600 hover:bg-gradient-to-br hover:from-red-600 hover:via-red-500 hover:to-red-600' onClick={() => removeTodo(todo._id)}><AiOutlineClose/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default TodoContainer