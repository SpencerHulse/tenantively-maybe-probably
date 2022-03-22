const router = require("express").Router();
const { User, Property, Amenities } = require("../../models");

// Get all users (eventually, exclude password attribute) - /api/users
// Shows users, their properties, and the amenities of those properties
router.get("/", (req, res) => {
  User.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get single user (eventually, exclude password attribute) - /api/users/:id
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

// Create new user account (might need to update for landlord/renter eventually) - /api/users
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

// Login to user account - /api/users/login
router.post("/login", (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this username." });
        return;
      }

      // User verification
      const validPassword = data.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(404).json({ message: "Incorrect password!" });
        return;
      }

      // If renters are added, make sure landlord/renter true/false goes here
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;

        res.status(200).json({ user: data, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Logout of user account - /api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Update user account - /api/users/:id
// Might want to narrow down what can be changed and not just have req.body eventually
router.put("/:id", (req, res) => {
  User.update(req.body, { individualHooks: true, where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this ID!" });
        return;
      }

      res.status(200).json({ message: "User successfully updated." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete account - /api/users/:id
router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this ID!" });
        return;
      }

      res.status(200).json({ message: "User successfully deleted." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
