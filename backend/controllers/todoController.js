import asynchandler from 'express-async-handler'
import Todo from '../models/Todos.js'


export const newTodo = asynchandler (async (req, res)=> {
    var {text, time, link} = req.body
    if(!text || !time){
        res.status(400)
        throw new Error('please add text and time to Todo')
    }
    if(!link.includes('https://')){
        link = 'https://'+link
    }
    const todo = await Todo.create({
        text,
        time,
        link
    });
    if(todo){
        res.status(201).json({
            _id: todo.id,
            text:todo.text,
            time: todo.time,
            link: todo.link
        })
    }else{
        res.status(400).json({error:'error user'})
    }
})

export const deleteTodo = asynchandler (async (req, res)=>{
    const remove = await Todo.findByIdAndDelete(req.params.id);
    res.json(remove);
})

export const listTodos = asynchandler (async (req, res)=>{
    const todos = await Todo.find();
    res.json(todos);
})

export const completeTodo = asynchandler (async (req, res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

export const editLink = asynchandler (async (req, res)=>{
    await Todo.updateOne({ _id : req.params.id }, { link: req.body.link });
    res.json("succese")
})
