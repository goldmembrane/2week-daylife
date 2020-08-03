"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("accepts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      accept: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.TEXT,
      },
      subtitle: {
        type: Sequelize.TEXT,
      },
      keyword: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("accepts");
  },
};
