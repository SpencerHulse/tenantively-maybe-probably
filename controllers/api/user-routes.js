const router = require("express").Router();
const { User, Property, Amenities } = require("../../models");

// Get all users (eventually, exclude password attribute)
// Shows users, their properties, and the amenities of those properties
router.get("/", (req, res) => {
  User.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get single user (eventually, exclude password attribute)
// Shows a user, their properties, and the amenities of those properties
router.get("/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this ID!" });
        return;
      }

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create new user account (might need to update for landlord/renter eventually)
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  })
    .then((data) => {
      // If renters are added, make sure landlord/renter true/false goes here
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;
      });

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
