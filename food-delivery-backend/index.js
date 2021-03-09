const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const orders = require("./routes/orders");

const { sequelize } = require("./models/index");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// Connect to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  password: '0',
  database: 'food'
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/users", users);
app.use("/orders", orders);

const port = process.env.PORT || 5000;

sequelize.sync({ force: false }).then( () => (
  app.listen(port, () => console.log(`Server up and running on port ${port} !`))
))
