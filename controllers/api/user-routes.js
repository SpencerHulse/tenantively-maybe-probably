const router = require("express").Router();
const { User, Property, Amenities } = require("../../models");

// Get all users - /api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get single user - /api/users/:id
// Currently only retrieves limited property attributes. Update as needed.
router.get("/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
    include: {
      model: Property,
      attributes: [
        "id",
        "address",
        "zip_code",
        "bedrooms",
        "bathrooms",
        "monthly_rent",
        "square_feet",
        "description",
        "availability",
      ],
      include: {
        model: Amenities,
        attributes: ["id", "laundry", "pets", "pool", "parking"],
      },
    },
  })
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

// Create new user account - /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  })
    .then((data) => {
      // Relevant session data
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;

        res.status(200).json(data);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login to user account - /api/users/login
router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } })
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

      // Session data
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
