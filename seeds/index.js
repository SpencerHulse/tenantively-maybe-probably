const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedAmenities = require("./amenitiesData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedAmenities();

  process.exit(0);
};

seedAll();
