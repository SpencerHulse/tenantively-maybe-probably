const router = require("express").Router();
/* API Routes */
const userRoutes = require("./user-routes");
const propertiesRoutes = require("./property-routes");
const amenitiesRoutes = require("./amenities-routes");
const uploadRoutes = require("./upload-routes");

/* Pathways */
router.use("/upload", uploadRoutes);
router.use("/users", userRoutes);
router.use("/properties", propertiesRoutes);
router.use("/amenities", amenitiesRoutes);

module.exports = router;
