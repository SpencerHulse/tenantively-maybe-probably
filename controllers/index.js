const router = require("express").Router();
/* Routes */
const dashboardRoutes = require("./dashboard-routes");
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

/* Pathways */
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

/* Custom 404 page */
router.use((req, res) => {
  res.render("404");
});

module.exports = router;
