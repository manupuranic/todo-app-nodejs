const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./utils/database");
const todosRouter = require("./routes/todos");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use("/todos", todosRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
