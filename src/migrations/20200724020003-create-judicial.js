"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("judicials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      keyword_id: {
        type: Sequelize.INTEGER,
      },
      judicate: {
        type: Sequelize.JSON,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("judicials");
  },
};
