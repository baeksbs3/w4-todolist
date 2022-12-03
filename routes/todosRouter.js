const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.js");

router.get("/", (req, res) => {
  res.send("Hi!");
});

router.post("/todos", async (req, res) => {
  console.log(req.body);
  const { value } = req.body;
  try {
    //check if there is orderId first, if there is add 1, not make it 1
    const maxOrderByUserId = await Todo.findOne().sort("-orders").exec();
    const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;

    //now, create todo value and orderid in the collection
    const todo = new Todo({ value, order });
    await todo.save();
    res.send({ todo });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();
  res.json({ todos: todos });
});
module.exports = router;
