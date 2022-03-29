const router = require("express").Router();
const { Property, Amenities } = require("../models");
const withAuth = require("../utils/auth.js");

/* User dashboard */
router.get("/", withAuth, (req, res) => {
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
      "updatedAt",
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
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* Page for Adding a Property */
router.get("/add-property", withAuth, (req, res) => {
  res.render("add-property", { loggedIn: req.session.loggedIn });
});

/* Page for a Single Owned Property */
router.get("/:id", withAuth, (req, res) => {
  Property.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "user_id",
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
      if (!data) {
        res.render("404");
        return;
      }

      /* Ensures that the user trying to edit the page is the user who owns the property */
      if (data.dataValues.user_id !== req.session.user_id) {
        res.redirect("/");
        return;
      }

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

module.exports = router;
