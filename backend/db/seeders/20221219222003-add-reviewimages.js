'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ReviewImages';

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
        reviewId: 1
      },
      {
        reviewId: 2
      },
      {
        reviewId: 3,
        url: "https://cdn.mos.cms.futurecdn.net/CFubit7V5muExqJPkbjRwg.jpg"
      },
      {
        reviewId: 4,
        url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/05/Griffin-Home-in-Family-Guy.jpg",
      },
      {
        reviewId: 5,
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
