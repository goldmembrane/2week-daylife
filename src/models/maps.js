"use strict";

module.exports = (sequelize, DataTypes) => {
  const maps = sequelize.define(
    "maps",
    {
      office_name: DataTypes.STRING,
      address: DataTypes.STRING,
      tel: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
    }
  );

  return maps;
};
