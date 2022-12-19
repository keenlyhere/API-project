'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  // define your schema in options object
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      preview: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages"
    await queryInterface.dropTable(options);
  }
};
