"use strict";

module.exports = (sequelize, DataTypes) => {
  const keyword = sequelize.define(
    "keyword",
    {
      user_id: DataTypes.INTEGER,
      keyword: DataTypes.STRING,
      total: DataTypes.INTEGER,
      dismiss: DataTypes.INTEGER,
    },
    { timestamps: false }
  );
  keyword.associate = function (models) {
    // associations can be defined here
    keyword.belongsTo(models.users, {
      foreignKey: "user_id",
    });
  };
  return keyword;
};
