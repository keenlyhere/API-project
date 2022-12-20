'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async newSpot({ ownerId, address, city, state, country, lat, lng, name, description, price }) {
      const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });
      return await Spot.findByPk(spot.id);
    }

    static associate(models) {
      // define association here

      Spot.belongsTo(
        models.User,
        {
          foreignKey: "ownerId"
        }
      );

      Spot.hasMany(
        models.Booking,
        {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

      Spot.hasMany(
        models.Review,
        {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true
        }
      );



    }
  }
  Spot.init({
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lat: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    lng: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
