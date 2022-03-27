const router = require("express").Router();
const { Amenities } = require("../../models");

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
router.post("/", (req, res) => {
  // Likely updated as more amenities are added
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
router.put("/", (req, res) => {
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

// Update amenities - /api/amenities/:id
router.put("/:id", (req, res) => {
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
// Likely this will not be used
router.delete("/:id", (req, res) => {
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
