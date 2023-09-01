// imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRouter from './routes/todoRoutes.js'

// configurations
dotenv.config();
const app = express()
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:true}))
app.use('/api', todoRouter)

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

app.get("/", (req, res) => {
    res.send("Connected");
});


app.listen(process.env.PORT, () =>{
    connect()
    console.log("Connected to Backend.")
});