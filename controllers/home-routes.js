const router = require("express").Router();
const sequelize = require('../config/connection');
const { Property, User } = require('../models')

router.get("/", (req, res) => {
  Property.findAll({
    attributes: [
      'id',
      'address',
      'description',
      'bedrooms',
      'bathrooms',
      'monthly_rent'
    ]
  })
  .then(data => {
    const properties = data.map(property => property.get({ plain: true }));
  res.render("homepage", { properties } );
  })
});

module.exports = router;
