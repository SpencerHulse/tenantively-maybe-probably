const router = require("express").Router();
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes");

router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.render("404");
});

module.exports = router;
