const router = require("express").Router();
const path = require("path");

const { Property, Amenities } = require("../../models");

// Deals with the uploads folder in the root
const fs = require("fs");
const util = require("util");
// Unlinks (removes) files stored in uploads once they are in the s3 bucket
const unlinkFile = util.promisify(fs.unlink);

// First takes any pictures uploaded and stores in the uploads folder using multer
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
// The functions that upload and delete files in the s3 bucket as needed
const { uploadFile, deleteFile } = require("../../public/js/aws-s3.js");

// The post route that handles uploading images - /api/upload/:id
router.post("/:id", upload.single("image"), async (req, res) => {
  const file = req.file;
  // Uploads file from temporary uploads folder to the s3 bucket
  const result = await uploadFile(file);
  // Removes file from temporary uploads folder using the path provided by multer
  await unlinkFile(file.path);

  // Finds the property you want to add the image to
  await Property.findOne({ where: { id: req.params.id } })
    .then((data) => {
      // Checks if the image already associated with the property is the default image
      if (data.property_image !== "default-image.webp") {
        // If it is not the default image, it deletes the image it is replacing from the s3 bucket
        deleteFile(data.property_image);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  // Updates the property with the new image name
  await Property.update(
    { property_image: file.filename },
    { where: { id: req.params.id } }
  ).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  // Redirects to the dashboard
  res.redirect("/dashboard");
});

module.exports = router;
