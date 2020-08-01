"use strict";
const { Model } = require("sequelize");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.keywords, {
        foreignKey: "user_id",
        as: "keyword",
      });
    }
  }
  users.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
      timestamps: false,
      hooks: {
        afterValidate: (data, options) => {
          var shaData = (password) => {
            return crypto
              .createHmac("sha1", "AAASUL")
              .update(`${password}`)
              .digest("base64");
          };
          data.password = shaData(data.password);
        },
      },
    }
  );
  return users;
};
