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
        startDate: '2022-05-20',
        endDate: '2022-05-25'
      },
      {
        spotId: 1,
        userId: 4,
        startDate: '2023-05-26',
        endDate: '2023-05-30'
      },
      {
        spotId: 2,
        userId: 6,
        startDate: '2023-02-23',
        endDate: '2023-03-02'
      },
      {
        spotId: 2,
        userId: 8,
        startDate: '2023-02-23',
        endDate: '2023-03-02'
      },
      {
        spotId: 3,
        userId: 10,
        startDate: '2023-08-01',
        endDate: '2023-08-08'
      },
      {
        spotId: 3,
        userId: 12,
        startDate: '2023-10-11',
        endDate: '2023-10-18'
      },
      {
        spotId: 4,
        userId: 14,
        startDate: '2023-10-21',
        endDate: '2023-10-31'
      },
      {
        spotId: 4,
        userId: 16,
        startDate: '2024-01-21',
        endDate: '2024-01-31'
      },
      {
        spotId: 5,
        userId: 18,
        startDate: '2023-12-21',
        endDate: '2023-12-28'
      },
      {
        spotId: 6,
        userId: 20,
        startDate: '2023-11-21',
        endDate: '2023-11-28'
      },
      {
        spotId: 8,
        userId: 3,
        startDate: '2023-10-11',
        endDate: '2023-10-18'
      },
      {
        spotId: 10,
        userId: 5,
        startDate: '2023-02-11',
        endDate: '2023-02-18'
      },
      {
        spotId: 12,
        userId: 7,
        startDate: '2023-03-14',
        endDate: '2023-03-17'
      },
      {
        spotId: 14,
        userId: 9,
        startDate: '2023-04-18',
        endDate: '2023-04-23'
      },
      {
        spotId: 16,
        userId: 11,
        startDate: '2023-04-28',
        endDate: '2023-05-01'
      },
      {
        spotId: 18,
        userId: 13,
        startDate: '2023-05-26',
        endDate: '2023-05-30'
      },
      {
        spotId: 20,
        userId: 15,
        startDate: '2023-06-06',
        endDate: '2023-06-10'
      },
      {
        spotId: 22,
        userId: 17,
        startDate: '2023-07-13',
        endDate: '2023-07-21'
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
