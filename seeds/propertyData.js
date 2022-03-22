const { Property } = require("../models");

const propertyData = [
  {
    user_id: 1,
    address: "3000 This Place Drive",
    zip_code: 99999,
    bedrooms: 4,
    bathrooms: 2.5,
    monthly_rent: 1500,
    square_feet: 900,
    description: "One classy place.",
    availability: "Now",
  },
  {
    user_id: 1,
    address: "3001 This Place Drive",
    zip_code: 99999,
    bedrooms: 2,
    bathrooms: 1.5,
    monthly_rent: 900,
    square_feet: 600,
    description: "Another classy place.",
    availability: "April 10th",
  },
  {
    user_id: 2,
    address: "2000 Where It Be Blvd",
    zip_code: 11111,
    bedrooms: 10,
    bathrooms: 6,
    monthly_rent: 3000,
    square_feet: 2500,
    description: "A big classy place.",
    availability: "Now",
  },
];

const seedProperties = () => Property.bulkCreate(propertyData);

module.exports = seedProperties;
