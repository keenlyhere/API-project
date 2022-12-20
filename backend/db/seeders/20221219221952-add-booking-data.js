'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Bookings';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-05-20',
        endDate: '2023-05-25'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2023-02-23',
        endDate: '2023-03-02'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-08-01',
        endDate: '2023-08-08'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2023-10-21',
        endDate: '2023-10-31'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2023-12-21',
        endDate: '2023-12-28'
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete(options, {}, {});
  }
};
