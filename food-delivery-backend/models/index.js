const Sequelize = require("sequelize");
const sequelize = new Sequelize("food", "newuser", "0", {
  dialect: "mysql",
  host: "localhost"
});

const User = require("./user.model")(Sequelize, sequelize);
const Order = require("./order.model")(Sequelize, sequelize)

module.exports.User = User;
module.exports.Order = Order;
module.exports.sequelize = sequelize;