const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contact extends Model {}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true
            }
        }
    }
)
