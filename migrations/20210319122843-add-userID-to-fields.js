'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Fields", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Fields", "userId");
  }
};
