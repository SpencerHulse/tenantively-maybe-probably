const User = require("./User");
const Property = require("./Property");
const Amenities = require("./Amenities");

/* Associations */
// A user can have many properties
User.hasMany(Property, {
  foreignKey: "user_id",
});
// A property belongs to a user
Property.belongsTo(User, {
  foreignKey: "user_id",
});
// A property has one set of amenities
Property.hasOne(Amenities, {
  foreignKey: "property_id",
});
// A set of amenities belongs to a single property
Amenities.belongsTo(Property, {
  foreignKey: "property_id",
});

module.exports = { User, Property, Amenities };
