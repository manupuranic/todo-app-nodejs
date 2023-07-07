const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Todo = sequelize.define("todo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  todoName: Sequelize.STRING,
  desc: Sequelize.STRING,
  completed: Sequelize.BOOLEAN,
});

module.exports = Todo;
