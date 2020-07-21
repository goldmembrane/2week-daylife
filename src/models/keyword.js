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
      keyword.belongsTo(models.users, {
        foreignKey: "user_id",
      });
    }
  }
  keyword.init(
    {
      keyword: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      dismiss: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "keyword",
    }
  );
  return keyword;
};
