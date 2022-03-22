const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedProperties = require("./propertyData");
const seedAmenities = require("./amenitiesData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedProperties();

  await seedAmenities();

  process.exit(0);
};

seedAll();
