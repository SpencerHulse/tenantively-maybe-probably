const router = require("express").Router();
const userRoutes = require("./user-routes");
const amenitiesRoutes = require("./amenities");

router.use("/users", userRoutes);
router.use("/amenities", amenitiesRoutes);

module.exports = router;
