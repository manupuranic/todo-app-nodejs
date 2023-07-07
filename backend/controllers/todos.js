const Todo = require("../models/todo");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
};

exports.addTodos = async (req, res, next) => {
  console.log(req.body);
  const todoName = req.body.todoName;
  const desc = req.body.desc;
  const completed = false;
  try {
    const result = await Todo.create({
      todoName: todoName,
      desc: desc,
      completed: completed,
    });
    res.json(result.dataValues);
  } catch (err) {
    console.log(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    await Todo.update(
      {
        completed: !todo.completed,
      },
      { where: { id: id } }
    );
    res.json({
      message: "updated",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    await todo.destroy();
    res.json({
      message: "deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
