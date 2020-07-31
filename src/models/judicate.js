"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class judicate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      judicate.belongsTo(models.keyword, {
        foreignKey: "keyword_id",
      });
    }
  }
  judicate.init(
    {
      keyword_id: DataTypes.INTEGER,
      judicate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "judicate",
      timestamps: false,
    }
  );
  return judicate;
};
