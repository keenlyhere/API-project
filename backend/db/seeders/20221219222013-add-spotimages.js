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
        spotId: 1,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680068124912.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://dejamoobucket.s3.us-west-2.amazonaws.com/1680068429410.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://dejamoobucket.s3.us-west-2.amazonaws.com/1680068429413.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://dejamoobucket.s3.us-west-2.amazonaws.com/1680068429415.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://dejamoobucket.s3.us-west-2.amazonaws.com/1680068429417.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://dejamoobucket.s3.us-west-2.amazonaws.com/1680068429418.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680068836509.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069451885.webp',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069219097.webp',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069219118.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069219120.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069219123.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069219125.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069219126.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069728538.webp',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069728558.webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069728560.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069728563.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069728564.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680069728566.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073530512.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073530532.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073530535.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073530536.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073530537.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073530539.webp',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073694522.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073843275.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073843293.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073843295.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073843298.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073843300.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680073843302.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074077567.webp',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074077590.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074077591.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074077593.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074077594.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074077597.webp',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074319431.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074319453.png',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074319458.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074319469.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074319470.webp',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074319473.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074546170.jpeg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074546144.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074546165.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074546168.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074546172.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680074546173.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680113811509.jpeg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680113811528.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680113811530.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680113811532.webp',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680113811533.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680113811534.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114184131.jpeg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114184154.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114184156.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114184158.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114184159.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114184161.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114420582.webp',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114420601.webp',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114420603.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114420604.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114420605.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114420606.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114648993.jpeg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114649012.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114649014.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114649016.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114649017.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680114649019.jpeg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680115748144.jpeg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680115748163.webp',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680115748165.webp',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680115748167.webp',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680115748169.webp',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680115748170.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680116679888.jpeg',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680116679903.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680116679905.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680116679906.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680116679907.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680116679908.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117035043.jpeg',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117035062.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117035064.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117035065.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117035067.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117035068.jpeg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117497717.webp',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117497736.jpeg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117497738.webp',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117497740.webp',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117497741.jpeg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117497742.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117869815.jpeg',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117869835.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117869839.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117869841.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117869843.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680117869845.jpeg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118143650.jpeg',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118143667.jpeg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118143669.webp',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118143671.webp',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118143672.jpeg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118143673.jpeg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118461366.jpeg',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118461384.jpeg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118461386.webp',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118461387.jpeg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118461389.jpeg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://dejamoobucket.s3.amazonaws.com/1680118461390.jpeg',
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
