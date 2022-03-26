const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
var moment = require('moment');

class Property extends Model {}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    monthly_rent: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    square_feet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "property",
  }
);

module.exports = Property;
