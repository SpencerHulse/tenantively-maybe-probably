const router = require("express").Router();
const { Property, Amenities } = require("../models");

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
    ],
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
  res.render("login");

})



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
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
  })
    .then((data) => {
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
