"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dismiss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dismiss.belongsTo(models.users, {
        foreignKey: "user_id",
      });
    }
  }
  dismiss.init(
    {
      user_id: DataTypes.INTEGER,
      dismiss: DataTypes.STRING,
      title: DataTypes.TEXT,
      subtitle: DataTypes.TEXT,
      keyword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "dismiss",
      timestamps: false,
    }
  );
  return dismiss;
};
