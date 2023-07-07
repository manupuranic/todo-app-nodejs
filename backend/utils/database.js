const Sequelize = require("sequelize");

const sequelize = new Sequelize("todo-app", "root", "root2000", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
