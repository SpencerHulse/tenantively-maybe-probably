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
    ],
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
  }).then((data) => {
    const properties = data.map((property) => property.get({ plain: true }));
    res.render("dashboard", { properties, loggedIn: req.session.loggedIn });
  });
});

router.get("/add-property", (req, res) => {
  res.render("add-property");
});

module.exports = router;
