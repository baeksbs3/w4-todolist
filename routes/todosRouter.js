const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.js");

router.get("/", (req, res) => {
  res.send("Hi!");
});
// create a todolist using POST method
router.post("/todos", async (req, res) => {
  const { value } = req.body;
  try {
    //check if there is orderId first, if there is add 1, not make it 1
    const maxOrderByUserId = await Todo.findOne().sort("-order").exec();
    const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;

    //now, create todo value and orderid in the collection
    const todo = new Todo({ value, order });
    await todo.save();
    res.send({ todo });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});
// show all todolists using GET method
router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();
  res.json({ todos: todos });
});

// change update todolist using PATCH method
router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { order, value, done } = req.body;

  const currentTodo = await Todo.findById({ _id: todoId });
  if (!currentTodo) {
    res.status(400).json({ error: "this todo item doesn't exist" });
  }
  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order;
  } else if (value) {
    currentTodo.value = value;
  } else if (done !== undefined) {
    currentTodo.doneAt = done ? new Date() : null;
  }
  await currentTodo.save();
  res.send({});
});

//delete todolist item using DELETE method
router.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    const deleteTodo = await Todo.deleteOne({ _id: todoId }).exec();
    res.send({});
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
