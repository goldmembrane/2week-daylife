"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  keyword.init(
    {
      user_id: DataTypes.INTEGER,
      keyword: DataTypes.STRING,
      total: DataTypes.INTEGER,
      dismiss: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "keyword",
      timestamps: false,
    }
  );
  return keyword;
};
