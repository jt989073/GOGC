"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Show.belongsTo(models.User, {
        foreignKey: ownerId,
      });
    }
  }
  Show.init(
    {
      venue: DataTypes.STRING,
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      dateTime: DataTypes.DATE,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Show",
    }
  );
  return Show;
};
