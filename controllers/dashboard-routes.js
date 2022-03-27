const router = require("express").Router();
const { Property, User, Amenities } = require("../models");

/* User dashboard */
router.get("/", (req, res) => {
  Property.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "address",
      "description",
      "bedrooms",
      "bathrooms",
      "monthly_rent",
      "property_type",
      "availability",
      "zip_code",
      "square_feet",
      "property_image",
      "createdAt",
    ],
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
  })
    .then((data) => {
      const properties = data.map((property) => property.get({ plain: true }));
      res.render("dashboard", {
        properties,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
      "availability",
      "zip_code",
      "square_feet",
      "property_image",
    ],
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
  })
    .then((data) => {
      const property = data.get({ plain: true });
      res.render("update-property", {
        property,
        loggedIn: req.session.loggedIn,
      });
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
