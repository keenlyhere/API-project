'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';

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
        ownerId: 2,
        address: '42 Wallaby Way',
        city: 'Sydney',
        state: 'NSW',
        country: 'Australia',
        lat: '-33.7559474',
        lng: '150.6014049',
        name: 'P Sherman',
        description: 'The very same location from Finding Nemo',
        price: 127.20
      },
      {
        ownerId: 2,
        address: '221B Baker St',
        city: 'London',
        state: 'Marylebone',
        country: 'United Kingdom',
        lat: '51.5237703',
        lng: '-0.1607444',
        name: 'Sherlock Homes',
        description: 'Come live like Sherlock Holmes in this fabulous holme!',
        price: 157.99
      },
      {
        ownerId: 2,
        address: '31 Spooner Street',
        city: 'Quahog',
        state: 'Rhode Island',
        country: 'USA',
        lat: '41.7783747',
        lng: '-71.426054',
        name: 'Family Guy',
        description: 'Are you a Family Guy? Then you have to stay here!',
        price: 127.20
      },
      {
        ownerId: 1,
        address: '4 Privet Drive',
        city: 'Little Whinging',
        state: 'Surrey',
        country: 'United Kingdom',
        lat: '47.5759203',
        lng: '-0.1863820',
        name: 'Dursley Family',
        description: 'Ever wanted to live under the stairs like Harry Potter? Now you can!',
        price: 279.50
      },
      {
        ownerId: 2,
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'Oregon',
        country: 'United States',
        lat: '21.7721747',
        lng: '-75.2312003',
        name: 'Simpson Family Home',
        description: 'Stay in the home of your favorite TV show',
        price: 82.30
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
