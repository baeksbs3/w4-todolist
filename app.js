const express = require("express");
const todosRouter = require("./routes/todosRouter.js");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
const connect = require("./models/index.js");
connect();
app.use(express.json());
app.use("/api", todosRouter);
app.use(express.static("./assets"));

app.listen(4010, () => {
  console.log("서버가 켜졌어요!");
});
