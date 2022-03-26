const router = require("express").Router();
const { Property, Amenities } = require("../../models");
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Find all properties - /api/properties
router.get("/", (req, res) => {
  Property.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find a single property - /api/properties/:id
router.get("/:id", (req, res) => {
  Property.findOne({
    where: { id: req.params.id },
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No property found with this ID!" });
        return;
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add a property - /api/properties
router.post("/", (req, res) => {
  Property.create({
    user_id: req.session.user_id,
    address: req.body.address,
    zip_code: req.body.zip_code,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    monthly_rent: req.body.monthly_rent,
    square_feet: req.body.square_feet,
    description: req.body.description,
    availability: req.body.availability,
    property_type: req.body.property_type,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a property - /api/properties/:id
router.put("/:id", (req, res) => {
  Property.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No property found with this ID!" });
        return;
      }

      res.status(200).json({ message: "Property successfully updated." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a property - /api/properties/:id
router.delete("/:id", (req, res) => {
  Property.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No property found with this ID!" });
        return;
      }

      res.status(200).json({ message: "Property successfully deleted." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
