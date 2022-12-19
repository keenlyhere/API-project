'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,
        {
          foreignKey: "userId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

      Booking.belongsTo(
        models.Spot,
        {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true
        }
      );
    }
  }
  Booking.init({
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      unique: true
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      unique: true,
      validate: {
        isBeforeStartDate(value) {
          if (value <= this.startDate) {
            throw new Error("endDate cannot be on or before startDate");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
