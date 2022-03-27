const router = require("express").Router();
const path = require("path");

const { Property, Amenities } = require("../../models");

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

const { uploadFile, deleteFile } = require("../../public/js/aws-s3.js");

router.post("/:id", upload.single("image"), async (req, res) => {
  const file = req.file;
  // Uploads file to s3
  const result = await uploadFile(file);
  // Removes file from temporary upload folder using the path provided by multer
  await unlinkFile(file.path);

  await Property.findOne({ where: { id: req.params.id } })
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
    { where: { id: req.params.id } }
  ).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  Property.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "address",
      "description",
      "bedrooms",
      "bathrooms",
      "monthly_rent",
      "property_type",
      "availability",
      "zip_code",
      "square_feet",
      "property_image",
      "createdAt",
      "updatedAt",
    ],
    include: {
      model: Amenities,
      attributes: ["id", "laundry", "pets", "pool", "parking"],
    },
  })
    .then((data) => {
      const properties = data.map((property) => property.get({ plain: true }));
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
