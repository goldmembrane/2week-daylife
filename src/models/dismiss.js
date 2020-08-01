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
      dismiss.belongsTo(models.keywords, {
        foreignKey: "keyword_id",
      });
    }
  }
  dismiss.init(
    {
      keyword_id: DataTypes.INTEGER,
      dismiss: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "dismiss",
      timestamps: false,
    }
  );
  return dismiss;
};
