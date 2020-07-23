"use strict";

const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      timestamps: false,
      hooks: {
        afterValidate: (data, options) => {
          var shaData = (password) => {
            return crypto
              .createHmac("sha1", "AAASUL")
              .update(password)
              .digest("base64");
          };
          data.password = shaData(data.password);
        },
      },
    }
  );
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.keyword, {
      foreignKey: "user_id",
      as: "keyword",
    });
  };
  return users;
};
