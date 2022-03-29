const { User } = require("../models");

const userData = [
  {
    username: "BigC",
    email: "bigc@email.com",
    password: "password",
    phone: 5558889292,
  },
  {
    username: "TheGoldenTouch",
    email: "midas@email.com",
    password: "passToTheWord",
    phone: 8882221010,
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
