const router = require("express").Router();
const sequelize = require('../config/connection');
const { Property, User, Amenities } = require('../models')
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

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
      'availability',
      'zip_code',
      'square_feet',
      'created_at',
      'monthly_rent'
    ],
    include: [
    {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
    {
      model: User,
      attributes: ['id', 'username']
    }
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

router.get("/add-property", (req, res) => {
  res.render("add-property");
});


module.exports = router;
