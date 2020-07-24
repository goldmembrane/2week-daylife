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
      keyword.hasMany(models.judicial, {
        foreignKey: "keyword_id",
        as: "keywords",
      });
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
