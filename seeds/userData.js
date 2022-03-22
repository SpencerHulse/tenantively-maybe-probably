const { User } = require("../models");

const userData = [
  {
    username: "TestUser",
    email: "testemail@fake.com",
    password: "password1234",
    phone: 1112223333,
  },
  {
    username: "TestUser2",
    email: "testemail2@fake.com",
    password: "password1234",
    phone: 3332221111,
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
