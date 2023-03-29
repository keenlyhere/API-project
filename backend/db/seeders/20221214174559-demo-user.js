"use strict";

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        return queryInterface.bulkInsert(
            options,
            [
                // {
                //     email: "nguyenkevin@gmail.com",
                //     username: "thekevnguyen",
                //     hashedPassword: bcrypt.hashSync("IamAGr8PW"),
                //     firstName: "Kevin",
                //     lastName: "Nguyen",
                // },
                // {
                //     email: "fahd@gmail.com",
                //     username: "messithegoat",
                //     hashedPassword: bcrypt.hashSync("f00tball4lyf3"),
                //     firstName: "Fahd",
                //     lastName: "Ahsan",
                // },
                // {
                //     email: "jamesduh@gmail.com",
                //     username: "duhitzjames",
                //     hashedPassword: bcrypt.hashSync("myCYP350"),
                //     firstName: "James",
                //     lastName: "Duh",
                // },
                {
                    email: "demo@user.io",
                    username: "Demoo-lition",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Demoo",
                    lastName: "Lition",
                },
                {
                    email: "will-smoo-th@gmail.com",
                    username: "WillSmooth",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Will",
                    lastName: "Smooth",
                },
                {
                    email: "moo-riah-carey@gmail.com",
                    username: "MooRiah",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Mooriah",
                    lastName: "Carey",
                },
                {
                    email: "kim-kow-dashian@gmail.com",
                    username: "KimKowDashian",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Kim",
                    lastName: "Kowdashian",
                },
                {
                    email: "lady-moo-moo@gmail.com",
                    username: "LadyMooMoo",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Lady",
                    lastName: "MooMoo",
                },
                {
                    email: "moohousevanhouten@gmail.com",
                    username: "moohouse",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Moohouse",
                    lastName: "Van Houton",
                },
                {
                    email: "demi-moo-re@gmail.com",
                    username: "DemiMoo-re",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Demi",
                    lastName: "Moo-re",
                },
                {
                    email: "lizziemooguire@gmail.com",
                    username: "lizziemoo",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Lizzie",
                    lastName: "Mooguire",
                },
                {
                    email: "leonardo@gmail.com",
                    username: "MrDiCowprio",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Leonardo",
                    lastName: "DiCowprio",
                },
                {
                    email: "mooganfreeman@gmail.com",
                    username: "mfreeman",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Moogan",
                    lastName: "Freeman",
                },
                {
                    email: "MooleyCyrus@gmail.com",
                    username: "mooleycyrus",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Mooley",
                    lastName: "Cyrus",
                },
                {
                    email: "cowstiano@gmail.com",
                    username: "cowstianoronaldo",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Cowstiano",
                    lastName: "Ronaldo",
                },
                {
                    email: "jkcowling@gmail.com",
                    username: "jkcowling",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "J.K.",
                    lastName: "Cowling",
                },
                {
                    email: "mooella@gmail.com",
                    username: "mooelladeville",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Mooella",
                    lastName: "Deville",
                },
                {
                    email: "missunderwood@gmail.com",
                    username: "cowieunderwood",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Cowie",
                    lastName: "Underwood",
                },
                {
                    email: "moochelle@gmail.com",
                    username: "moochelleobama",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Moochelle",
                    lastName: "Obama",
                },
                {
                    email: "georgemooney@gmail.com",
                    username: "georgemooney",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "George",
                    lastName: "Mooney",
                },
                {
                    email: "amberherd@gmail.com",
                    username: "amberherd",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Amber",
                    lastName: "Herd",
                },
                {
                    email: "milkakunis@gmail.com",
                    username: "milkakunis",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Milka",
                    lastName: "Kunis",
                },
                {
                    email: "micowjordan@gmail.com",
                    username: "micowjordan",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Mi-Cow",
                    lastName: "Jordan",
                },
                {
                    email: "mooievuitton@gmail.com",
                    username: "mooievuitton",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Mooie",
                    lastName: "Vuitton",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {}, {});
    },
};

// username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
