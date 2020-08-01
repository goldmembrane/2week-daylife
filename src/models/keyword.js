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

      keyword.hasMany(models.judicate, {
        foreignKey: "keyword_id",
        as: "judicate",
      });
      keyword.hasMany(models.accept, {
        foreignKey: "keyword_id",
        as: "accept",
      });
      keyword.hasMany(models.dismiss, {
        foreignKey: "keyword_id",
        as: "dismiss",
      });
    }
  }
  keyword.init(
    {
      user_id: DataTypes.INTEGER,
      keyword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "keywords",
      timestamps: false,
    }
  );
  return keyword;
};
