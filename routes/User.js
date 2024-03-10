const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/checkUsername', UserController.checkUsername);

// router.post('/todos', async (req, res) => {
//     const { title, description, completed } = req.body;
//     const todo = new Todo({ title, description, completed });
//     await todo.save();
//     res.status(201).json(todo);
// });

// router.get('/todos', async (req, res) => {
//     const todos = await Todo.find();
//     res.json(todos);
// });

// router.get('/todos/:id', async (req, res) => {
//     const todo = await Todo.findById(req.params.id);
//     res.json(todo);
// });

// router.put('/todos/:id', async (req, res) => {
//     const { title, description, completed } = req.body;
//     const todo = await Todo.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true });
//     res.json(todo);
// });

// router.delete('/todos/:id', async (req, res) => {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.status(204).send();
// });

module.exports = router;