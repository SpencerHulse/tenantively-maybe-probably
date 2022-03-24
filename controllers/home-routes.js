const router = require("express").Router();
const sequelize = require('../config/connection');
const { Property, User, Amenities } = require('../models')

router.get("/", (req, res) => {
  Property.findAll({
    attributes: [
      'id',
      'address',
      'description',
      'bedrooms',
      'bathrooms',
      'monthly_rent',
      'property_type'
    ]
  })
  .then(data => {
    const properties = data.map(property => property.get({ plain: true }));
  res.render("homepage", { properties } );
  })
});

router.get("/dashboard/:id", (req, res) => {
  Property.findAll({
    where: {
      user_id: 1
    },
    attributes: [
      'id',
      'address',
      'description',
      'bedrooms',
      'bathrooms',
      'monthly_rent',
      'property_type',
      'availability'
    ]
  })
  .then(data => {
    const properties = data.map(property => property.get({ plain: true }));
  res.render("dashboard", { properties } );
  })
})

router.get("/property/:id", (req, res) => {
  Property.findOne({
    where: { id: req.params.id },
    attributes: [
      'id',
      'address',
      'description',
      'bedrooms',
      'bathrooms',
      'monthly_rent',
      'property_type'
    ],
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    }
  })
  .then(data => {
    const properties = data.get({ plain: true });
  res.render("single-property", { properties } );
  })
});

module.exports = router;
