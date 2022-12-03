const express = require("express");
const app = express();
const todosRouter = require("./routes/todosRouter.js");
const dotenv = require("dotenv");
require("dotenv").config();
const connect = require("./models/index.js");
connect();

app.use("/api", express.json(), todosRouter);
app.use(express.static("./assets"));

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
