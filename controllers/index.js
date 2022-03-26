const router = require("express").Router();
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const imageRoutes = require("./upload-routes");
var moment = require("moment");

router.use("/upload", imageRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
