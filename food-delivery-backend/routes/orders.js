const express = require("express");
const router = express.Router();

const { Order } = require("../models");

router.post("/create", (req, res) => {
  const {name, street, pincode, phone} = {...req.body}
  Order.create({
    name: name,
    address: street,
    pincode: pincode,
    phone_number: phone
  }).then( order => res.json(order))
  .catch(err => console.log(err))
})

router.get("/", (req, res) => {
  Order.findAll().then( orders => res.json(orders))
  .catch(err => console.log(err))
})

module.exports = router;