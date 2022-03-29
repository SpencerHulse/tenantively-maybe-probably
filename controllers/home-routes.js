const router = require("express").Router();
const { Property, Amenities, User } = require("../models");

/* Homepage */
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
      "updatedAt",
    ],
    order: [["updatedAt", "DESC"]],
  })
    .then((data) => {
      const properties = data.map((property) => property.get({ plain: true }));
      res.render("homepage", { properties, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* Address route for filtered homepage results */
router.get("/filtered/:zip", (req, res) => {
  Property.findAll({
    where: {
      zip_code: req.params.zip,
    },
    attributes: [
      "id",
      "address",
      "description",
      "bedrooms",
      "bathrooms",
      "monthly_rent",
      "property_type",
      "property_image",
      "zip_code",
    ],
  })
    .then((data) => {
      if (!data) {
        res.render("404");
        return;
      }

      const properties = data.map((property) => property.get({ plain: true }));

      res.render("homepage", {
        properties,
        loggedIn: req.session.loggedIn,
        filtered: true,
        zipcode: req.params.zip,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* Login page */
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

/* Sign up page */
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

/* Single property page */
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
    include: [
      {
        model: Amenities,
        attributes: ["id", "laundry", "pets", "pool", "parking"],
      },
      {
        model: User,
        attributes: ["id", "email", "phone"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.render("404");
        return;
      }

      const properties = data.get({ plain: true });

      res.render("single-property", {
        properties,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
