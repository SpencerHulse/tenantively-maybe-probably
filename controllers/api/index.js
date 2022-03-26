const router = require("express").Router();
const userRoutes = require("./user-routes");
const propertiesRoutes = require("./property-routes");
const amenitiesRoutes = require("./amenities-routes");

/* var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars); */

router.use("/users", userRoutes);
router.use("/properties", propertiesRoutes);
router.use("/amenities", amenitiesRoutes);

module.exports = router;
