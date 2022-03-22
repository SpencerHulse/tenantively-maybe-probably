const User = require("./User");
const Property = require("./Property");
const Amenities = require("./Amenities");

User.hasMany(Property, {
  foreignKey: "user_id",
});

Property.belongsTo(User, {
  foreignKey: "user_id",
});

Property.hasOne(Amenities, {
  foreignKey: "property_id",
});

Amenities.belongsTo(Property, {
  foreignKey: "property_id",
});

module.exports = { User, Property, Amenities };
