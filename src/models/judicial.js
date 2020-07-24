"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class judicial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  judicial.init(
    {
      keyword_id: DataTypes.INTEGER,
      judicate: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "judicial",
      timestamps: false,
    }
  );
  return judicial;
};
