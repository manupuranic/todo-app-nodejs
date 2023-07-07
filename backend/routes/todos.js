const express = require("express");

const todosController = require("../controllers/todos");

const router = express.Router();

router.get("/", todosController.getTodos);

router.post("/add-todo", todosController.addTodos);

router.post("/done-todo/:id", todosController.updateTodo);

router.delete("/delete-todo/:id", todosController.deleteTodo);

module.exports = router;
