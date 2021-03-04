module.exports = (Sequelize, sequelize) => 
  sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      required: true
    },
    email: {
      type: Sequelize.STRING,
      required: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    },
    date: {
      type: Sequelize.DATE,
      default: Date.now
    }
  })