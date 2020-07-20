"use strict";

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    { timestamps: false }
  );
  users.associate = function (models) {};
  return users;
};
