module.exports = (Sequelize, sequelize) => 
  sequelize.define("order", {
    name: {
      type: Sequelize.STRING,
      required: true
    },
    address: {
      type: Sequelize.STRING,
      required: true
    },
    pincode: {
      type: Sequelize.STRING,
      required: true
    },
    phone_number: {
      type: Sequelize.BIGINT(11),
    }
  })