'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams"
        }
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams"
        }
      },
      winnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams"
        }
      },
      matchDate: {
        defaultValue: Sequelize.literal("CURRENT_DATETIME"),
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_DATETIME"),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_DATETIME"),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  }
};
