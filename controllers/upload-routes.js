const router = require("express").Router();
const path = require("path");

const { Property } = require("../models");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Where the files are being uploaded,
    // with the file path going from the root
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // The name of the file (date + original name)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const { uploadFile, deleteFile } = require("../public/js/aws-s3.js");

// Just the page, not anything to do with uploading
router.get("/", (req, res) => {
  Property.findOne({
    where: { id: 1 },
    attributes: ["property_image"],
  }).then((data) => {
    const properties = data.get({ plain: true });
    res.render("upload", { properties });
  });
});

router.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  // Uploads file to s3
  const result = await uploadFile(file);
  // Removes file from temporary upload folder using the path provided by multer
  await unlinkFile(file.path);

  await Property.findOne({ where: { id: 1 } })
    .then((data) => {
      if (data.property_image !== "default-image.webp") {
        deleteFile(data.property_image);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  await Property.update(
    { property_image: file.filename },
    // Currently hard coded
    { where: { id: 1 } }
  ).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  Property.findOne({
    where: { id: 1 },
    attributes: ["property_image"],
  }).then((data) => {
    const properties = data.get({ plain: true });
    res.render("upload", { properties });
  });
});

module.exports = router;
