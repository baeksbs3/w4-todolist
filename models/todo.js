// models/todo.js

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  value: String, // todo list item
  doneAt: Date,
  order: Number, //order of todolist
});
//create todId virtual column, show this schema when it is set to json
TodoSchema.virtual("todoId").get(function () {
  return this._id.toHexString();
});
TodoSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Todo", TodoSchema);
