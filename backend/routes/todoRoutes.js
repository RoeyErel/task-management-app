import express from 'express'
const router = express.Router();
import * as userController from '../controllers/todoController.js';

router.get("/", (req, res) => {
    res.send("Todo is on");
});

router.post('/todos/new', userController.newTodo)
router.delete('/todos/delete/:id', userController.deleteTodo)
router.get('/todos', userController.listTodos)
router.get('/todos/complete/:id', userController.completeTodo)

export default router;