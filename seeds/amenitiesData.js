const { Amenities } = require("../models");

const amenitiesData = [
  {
    property_id: 1,
    laundry: true,
    pets: false,
    pool: true,
    parking: "Street Parking",
  },
  {
    property_id: 2,
    laundry: true,
    pets: false,
    pool: true,
    parking: "Reserved Parking",
  },
  {
    property_id: 3,
    laundry: true,
    pets: false,
    pool: true,
    parking: "Garage Parking",
  },
];

const seedAmenities = () => Amenities.bulkCreate(amenitiesData);

module.exports = seedAmenities;
