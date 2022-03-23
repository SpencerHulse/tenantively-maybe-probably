const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Amenities extends Model {}

Amenities.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "property",
        key: "id",
      },
    },
    laundry: {
      type: DataTypes.BOOLEAN,
    },
    pets: {
      type: DataTypes.BOOLEAN,
    },
    pool: {
      type: DataTypes.BOOLEAN,
    },
    parking: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "amenities",
  }
);

module.exports = Amenities;
