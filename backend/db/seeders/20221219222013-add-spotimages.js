'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'SpotImages';

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
        spotId: 2,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sherlock-holmes.co.uk%2F&psig=AOvVaw1gT1gDGiIkg2ejZKXeXeNk&ust=1671577022328000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCICb5ubjhvwCFQAAAAAdAAAAABAE',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://sites.psu.edu/ksl5279/files/2018/09/holger-link-759529-unsplash-128flde-e1538349778457.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://static.wikia.nocookie.net/familyguy/images/f/f1/Griffin_Home.jpg/revision/latest?cb=20090614171921',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.insider.com/57dff03aa1e3051b008b49df?width=700',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/simpsons/images/6/65/800px-742_Evergreen_Terrace.png/revision/latest?cb=20170101225756',
        preview: false
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
