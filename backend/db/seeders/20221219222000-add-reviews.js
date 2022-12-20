'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Reviews';

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
        review: 'Beautiful place to stay with my family!',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Great place but a bit small',
        stars: 4
      },
      {
        spotId: 5,
        userId: 2,
        review: 'This place was nice and spacious. I really enjoyed staying here!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'This place was not as described.',
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        review: 'I have always wanted to stay in a cramped room under the staircase! This place was great, but too pricey for what it is.',
        stars: 3
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
