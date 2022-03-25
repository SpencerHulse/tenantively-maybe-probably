const router = require("express").Router();
const sequelize = require("../config/connection");
const { Property, User, Amenities } = require("../models");

router.get("/", (req, res) => {
  Property.findAll({
    attributes: [
      "id",
      "address",
      "description",
      "bedrooms",
      "bathrooms",
      "monthly_rent",
      "property_type",
      "property_image",
    ],
  })
    .then((data) => {
      const properties = data.map((property) => property.get({ plain: true }));
      res.render("homepage", { properties });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/property/:id", (req, res) => {
  Property.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "address",
      "description",
      "bedrooms",
      "bathrooms",
      "monthly_rent",
      "property_type",
      "property_image",
    ],
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
  })
    .then((data) => {
      const properties = data.get({ plain: true });
      res.render("single-property", { properties });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/add-property", (req, res) => {
  res.render("add-property");
});

module.exports = router;
