"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class accept extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accept.belongsTo(models.users, {
        foreignKey: "user_id",
      });
    }
  }
  accept.init(
    {
      user_id: DataTypes.INTEGER,
      accept: DataTypes.STRING,
      title: DataTypes.TEXT,
      subtitle: DataTypes.TEXT,
      keyword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "accept",
      timestamps: false,
    }
  );
  return accept;
};
