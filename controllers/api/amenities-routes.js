const router = require("express").Router();
const { Amenities } = require("../../models");
const withAuth = require("../../utils/auth.js");

// Find all sets of amenities - /api/amenities
router.get("/", (req, res) => {
  Amenities.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find a single set of amenities - /api/amenities/:id
router.get("/:id", (req, res) => {
  Amenities.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No amenities found with this ID!" });
        return;
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add amenities - /api/amenities
router.post("/", withAuth, (req, res) => {
  // Update if more amenities are added
  Amenities.create({
    property_id: req.body.property_id,
    laundry: req.body.laundry,
    pets: req.body.pets,
    pool: req.body.pool,
    parking: req.body.parking,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update amenities using property id /api/amenities
// Used in update-property.js
router.put("/", withAuth, (req, res) => {
  Amenities.update(req.body, { where: { property_id: req.body.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No amenities found with this ID!" });
        return;
      }

      res.status(200).json({ message: "Amenities successfully updated." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update amenities using id - /api/amenities/:id
router.put("/:id", withAuth, (req, res) => {
  Amenities.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No amenities found with this ID!" });
        return;
      }

      res.status(200).json({ message: "Amenities successfully updated." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete amenities - /api/amenities/:id
router.delete("/:id", withAuth, (req, res) => {
  Amenities.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No amenities found with this ID!" });
        return;
      }

      res.status(200).json({ message: "Amenities successfully deleted." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
