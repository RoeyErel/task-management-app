// imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './models/Todo.js'

// configurations
const app = express()
dotenv.config();
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:true}))

// MONGOOSE
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("Disconnected", () => {
  console.log("mongoDB disconnected")
});

//List
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

//New todo
app.post('/todos/new', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
  });

app.delete('/todos/delete/:id', async (req, res) => {
    const remove = await Todo.findByIdAndDelete(req.params.id);
    res.json(remove);
});

app.get('/todos/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

app.get("/", (req, res) => {
    res.send("Connected");
});


app.listen(port, () =>{
    connect()
    console.log("Connected to Backend.")
});