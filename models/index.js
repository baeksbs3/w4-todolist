const mongoose = require("mongoose");
// connect to mongdb
const connect = () => {
  mongoose.connect(process.env.dbURI),
    { useNewUrlParser: true, useUnifiedTopology: true };
};
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("mongodb connection error", err);
});
db.once("open", () => console.log("connection success"));

module.exports = connect;
