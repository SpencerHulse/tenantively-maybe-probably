const { Amenities } = require("../models");

const amenitiesData = [
  {
    property_id: null,
    laundry: true,
    pets: false,
    pool: true,
    parking: "Street Parking",
  },
  {
    property_id: null,
    laundry: true,
    pets: false,
    pool: true,
    parking: "Garage Parking",
  },
  {
    property_id: null,
    laundry: true,
    pets: false,
    pool: true,
    parking: "No Parking",
  },
  {
    property_id: null,
    laundry: true,
    pets: false,
    pool: true,
    parking: "Reserved Parking",
  },
];

const seedAmenities = () => Amenities.bulkCreate(amenitiesData);

module.exports = seedAmenities;
