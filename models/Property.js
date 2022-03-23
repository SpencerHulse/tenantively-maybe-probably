const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Property extends Model {}

Property.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        landlord_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'landlord',
                key: 'id'
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: DataTypes.DECIMAL(10, 1),
            allowNull: false,

        },
        rent: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        utilities: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
     },
     {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'property'
      }
    
);

module.exports = Property;