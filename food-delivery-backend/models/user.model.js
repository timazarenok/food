module.exports = (Sequelize, sequelize) => 
  sequelize.define("user", {
    userName: {
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