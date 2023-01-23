'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Users';

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
        email: 'nguyenkevin@gmail.com',
        username: 'thekevnguyen',
        hashedPassword: bcrypt.hashSync('IamAGr8PW'),
        firstName: "Kevin",
        lastName: "Nguyen"
      },
      {
        email: 'fahd@gmail.com',
        username: 'messithegoat',
        hashedPassword: bcrypt.hashSync('f00tball4lyf3'),
        firstName: "Fahd",
        lastName: "Ahsan"
      },
      {
        email: 'jamesduh@gmail.com',
        username: 'duhitzjames',
        hashedPassword: bcrypt.hashSync('myCYP350'),
        firstName: "James",
        lastName: "Duh"
      },
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Demo",
        lastName: "Lition"
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

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});

  }
};

// username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
