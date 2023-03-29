"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Spots";

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
                {
                    ownerId: 2,
                    address: "42 Wallaby Way",
                    city: "Sydney",
                    state: "NSW",
                    country: "Australia",
                    lat: "-33.7559474",
                    lng: "150.6014049",
                    name: "P Sherman",
                    description: "The very same location from Finding Nemo",
                    price: 127,
                },
                {
                    ownerId: 2,
                    address: "221B Baker St",
                    city: "London",
                    state: "Marylebone",
                    country: "United Kingdom",
                    lat: "51.5237703",
                    lng: "-0.1607444",
                    name: "Sherlock Homes",
                    description: "Come live like Sherlock Holmes in this fabulous holme!",
                    price: 157,
                },
                {
                    ownerId: 2,
                    address: "31 Spooner Street",
                    city: "Quahog",
                    state: "Rhode Island",
                    country: "USA",
                    lat: "41.7783747",
                    lng: "-71.426054",
                    name: "Family Guy",
                    description: "Are you a Family Guy? Then you have to stay here!",
                    price: 127,
                },
                {
                    ownerId: 1,
                    address: "4 Privet Drive",
                    city: "Little Whinging",
                    state: "Surrey",
                    country: "United Kingdom",
                    lat: "47.5759203",
                    lng: "-0.1863820",
                    name: "Dursley Family",
                    description: "Ever wanted to live under the stairs like Harry Potter? Now you can!",
                    price: 279,
                },
                {
                    ownerId: 2,
                    address: "742 Evergreen Terrace",
                    city: "Springfield",
                    state: "Oregon",
                    country: "United States",
                    lat: "21.7721747",
                    lng: "-75.2312003",
                    name: "Simpson Family Home",
                    description: "Stay in the home of your favorite TV show",
                    price: 82,
                },
                {
                    ownerId: 3,
                    address: "1312 Snowy Way",
                    city: "Juneau",
                    state: "Alaska",
                    country: "United States",
                    lat: "21.7721747",
                    lng: "-75.2312003",
                    name: "Coldstone Creamery",
                    description: "Eat some udderly delicious ice cream as you relax!",
                    price: 223,
                },
                {
                    ownerId: 3,
                    address: "1705 S Highland Ave",
                    city: "Jackson",
                    state: "Tennessee",
                    country: "United States",
                    lat: "21.7721747",
                    lng: "-75.2312003",
                    name: "You the only ten I see punny home",
                    description:
                        "If you enjoy puns, then you should definitely stay here and have the most pun-tastic time.",
                    price: 180,
                },
                {
                    ownerId: 5,
                    address: "1313 Mockingbird Lane",
                    city: "Transylvania",
                    state: "PA",
                    country: "USA",
                    lat: "40.0151564",
                    lng: "-105.2793318",
                    name: "Munster Mansion",
                    description: "Home of the beloved TV family, The Munsters. With cowhide carpets and furniture!",
                    price: 225,
                },
                {
                    ownerId: 5,
                    address: "123 Sesame Street",
                    city: "New York",
                    state: "NY",
                    country: "USA",
                    lat: "40.759011",
                    lng: "-73.9844722",
                    name: "Big Bird's Nest",
                    description: "The iconic home of Big Bird and his friends!",
                    price: 99,
                },
                {
                    ownerId: 7,
                    address: "1313 Spooky Lane",
                    city: "Mockingbird Heights",
                    state: "CA",
                    country: "USA",
                    lat: "37.8392451",
                    lng: "-122.2626954",
                    name: "The Addams Cow Manor",
                    description:
                        "The home of the macabre Addams family with cow skulls and bones decorating the walls!",
                    price: 500,
                },
                {
                    ownerId: 7,
                    address: "123 Cowbell Lane",
                    city: "Nashville",
                    state: "TN",
                    country: "USA",
                    lat: "36.165889",
                    lng: "-86.782777",
                    name: "Johnny Bovine's Ranch",
                    description:
                        "The sprawling ranch belonging to country music superstar Johnny Bovine with a cow-themed recording studio!",
                    price: 800,
                },
                {
                    ownerId: 9,
                    address: "456 Udder Road",
                    city: "Milwaukee",
                    state: "WI",
                    country: "USA",
                    lat: "43.038902",
                    lng: "-87.906471",
                    name: "The Creamery Condo",
                    description:
                        "A luxurious condominium complex with cow-printed walls and cow-themed furniture in every unit!",
                    price: 300,
                },
                {
                    ownerId: 11,
                    address: "789 Bovine Avenue",
                    city: "Austin",
                    state: "TX",
                    country: "USA",
                    lat: "30.2672",
                    lng: "-97.7431",
                    name: "Cowboy Ranch House",
                    description: "A rustic ranch house with cowhide rugs and cow-themed decor in every room!",
                    price: 500,
                },
                {
                    ownerId: 13,
                    address: "456 Cowbell Lane",
                    city: "Nashville",
                    state: "TN",
                    country: "USA",
                    lat: "36.1627",
                    lng: "-86.7816",
                    name: "The Cowbell Cottage",
                    description: "A charming and cozy cottage with cow-themed decor and furniture!",
                    price: 150,
                },
                {
                    ownerId: 13,
                    address: "789 Milkmaid Street",
                    city: "San Francisco",
                    state: "CA",
                    country: "USA",
                    lat: "37.7749",
                    lng: "-122.4194",
                    name: "The Cowhide Condo",
                    description: "A modern and stylish condo with cowhide rugs and cow-themed accents throughout!",
                    price: 350,
                },
                {
                    ownerId: 15,
                    address: "345 Cowbell Road",
                    city: "New Orleans",
                    state: "LA",
                    country: "USA",
                    lat: "29.9511",
                    lng: "-90.0715",
                    name: "The Cowbell House",
                    description: "A charming house with cow-themed decor and a cowbell collection!",
                    price: 300,
                },
                {
                    ownerId: 15,
                    address: "789 Milk Street",
                    city: "Boston",
                    state: "MA",
                    country: "USA",
                    lat: "42.3601",
                    lng: "-71.0589",
                    name: "The Bovine Bungalow",
                    description:
                        "A cozy and comfortable bungalow with cow-patterned bedding and cow-themed accents throughout!",
                    price: 200,
                },
                {
                    ownerId: 17,
                    address: "456 Cowpens Circle",
                    city: "Charleston",
                    state: "SC",
                    country: "USA",
                    lat: "32.7765",
                    lng: "-79.9311",
                    name: "The Cowhide Cabin",
                    description:
                        "A rustic cabin with cowhide rugs, cow-patterned curtains, and cow-themed art on the walls!",
                    price: 175,
                },
                {
                    ownerId: 17,
                    address: "13 Dairy Drive",
                    city: "Atlanta",
                    state: "GA",
                    country: "USA",
                    lat: "33.7490",
                    lng: "-84.3880",
                    name: "Bovine Beach House",
                    description:
                        "A beautiful beach house with stunning ocean views and cow-themed decorations throughout!",
                    price: 400,
                },
                {
                    ownerId: 19,
                    address: "46 Holstein Avenue",
                    city: "San Diego",
                    state: "CA",
                    country: "USA",
                    lat: "32.7157",
                    lng: "-117.1611",
                    name: "Bovine Barn",
                    description: "A renovated barn with modern amenities and a cow-themed interior design!",
                    price: 300,
                },
                {
                    ownerId: 21,
                    address: "123 Angus Road",
                    city: "Houston",
                    state: "TX",
                    country: "USA",
                    lat: "29.7604",
                    lng: "-95.3698",
                    name: "Bovine Boutique Hotel",
                    description:
                        "A stylish boutique hotel with cow-patterned wallpaper and cow-themed decor in every room!",
                    price: 500,
                },
                {
                    ownerId: 21,
                    address: "3723 Main St",
                    city: "Surf City",
                    state: "CA",
                    country: "USA",
                    lat: "33.660297",
                    lng: "-117.999226",
                    name: "Cowabunga Condo",
                    description: "Catch some gnarly waves and soak up the sun in this cow-themed beachfront condo!",
                    price: 299,
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
        return queryInterface.bulkDelete(options, {}, {});
    },
};
