const router = require("express").Router();
const userRoutes = require("./user-routes");
const propertiesRoutes = require("./property-routes");
const amenitiesRoutes = require("./amenities-routes");

router.use("/users", userRoutes);
router.use("/properties", propertiesRoutes);
router.use("/amenities", amenitiesRoutes);

module.exports = router;
