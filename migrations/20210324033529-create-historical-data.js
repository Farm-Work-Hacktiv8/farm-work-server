'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("HistoricalData", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        dataPerDay: {
            type: Sequelize.JSON,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATEONLY,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATEONLY,
        },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HistoricalData');
  }
};