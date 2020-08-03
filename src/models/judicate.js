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
      judicate.belongsTo(models.users, {
        foreignKey: "user_id",
      });
    }
  }
  judicate.init(
    {
      user_id: DataTypes.INTEGER,
      judicate: DataTypes.TEXT,
      title: DataTypes.TEXT,
      subtitle: DataTypes.TEXT,
      keyword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "judicate",
      timestamps: false,
    }
  );
  return judicate;
};
