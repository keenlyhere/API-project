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
        review: 'Great place but a bit small. It was a good location for exploring Sydney though!',
        stars: 4
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Yuck this place is smaller than my bathtub. Avoid at all cost!',
        stars: 1
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
      {
        spotId: 2,
        userId: 6,
        review: "Staying at Sherlock Homes was a dream come true for a Sherlock Holmes fan like myself. The apartment was beautifully decorated and had all the modern amenities one could ask for. The location was perfect, with easy access to public transport and some of London's best attractions. Highly recommend!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review: 'This place is not fit for human living!!! It smells so old in here...',
        stars: 1
      },
      {
        spotId: 2,
        userId: 8,
        review: 'We had a lovely stay at Sherlock Homes. The apartment was clean, comfortable, and well-equipped. The location was great and we were able to explore London easily from there. Would definitely recommend to anyone looking for a unique place to stay in the city.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 15,
        review: "My family and I had an amazing time staying at Family Guy. The house was spacious and had everything we needed for a comfortable stay. The location was great, with plenty of nearby attractions and things to do. Highly recommend!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'This place was dirty! But it was one of the bigger places I have stayed at...bigger as in...at least it is bigger than my bathtub.',
        stars: 1
      },
      {
        spotId: 3,
        userId: 19,
        review: 'I am not a fan of Family Guy, but my husband is a big fan, so we had to stay here. Personally I thought the neighborhood was not the safest and it was quite far from all tourist attractions. If you just want a staycation then sure, stay here. Otherwise, I would stay away.',
        stars: 2
      },
      {
        spotId: 3,
        userId: 20,
        review: 'The doors were way too small! I had to duck down to go through each of the doors. Needless to say, I did not enjoy this stay.',
        stars: 1
      },
      {
        spotId: 4,
        userId: 13,
        review: 'This was almost exactly like how I envisioned it when I wrote the Harry Potter books. Bravo on replicating it! I had a wonderful stay and will return.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 21,
        review: 'I chose to stay here because I needed some inspiration for my next line of designer handbags. I think I found it here and that is enough for me to give them a full 5 star review!',
        stars: 5
      },
      {
        spotId: 5,
        userId: 5,
        review: 'I thought that I would get the whole home to myself, but I actually had to share a room with Lisa. She was such a lovely girl though!',
        stars: 3
      },
      {
        spotId: 5,
        userId: 6,
        review: "I rented out this home to prank my best friend Bart! Honestly, it wasn't anything too special. I guess his room was cleaner than when I usually sleepover here...for free...",
        stars: 4
      },
      {
        spotId: 5,
        userId: 4,
        review: 'I AM APPALLED! THERE WAS A WHOLE OTHER FAMILY HERE! WHY DID I HAVE TO SHARE A ROOM WITH A LITTLE GIRL? And worst of all...her pearl necklace was so FAKE!!!',
        stars: 1
      },
      {
        spotId: 6,
        userId: 8,
        review: 'I loved staying here because a perk of staying here was UNLIMITED ice cream. It does NOT get any better than that.',
        stars: 4
      },
      {
        spotId: 6,
        userId: 4,
        review: 'The bed was SO small. I hated this place!',
        stars: 1
      },
      {
        spotId: 6,
        userId: 14,
        review: 'Great place for me to hide dalmations. 5/5!',
        stars: 5
      },
      {
        spotId: 8,
        userId: 4,
        review: 'Munster Mansion? More like Munster Shoebox. This place was SO SMALL. My refridgerator is larger than this so-called mansion.',
        stars: 1
      },
      {
        spotId: 8,
        userId: 10,
        review: 'Home was nice and roomy. I quite enjoyed my stay here. I would definitely recommend this to my friends.',
        stars: 4
      },
      {
        spotId: 10,
        userId: 7,
        review: 'STAY AWAY! I think this house may be haunted. There was a HAND, like a SEVERED HAND, moving around by itself!',
        stars: 2
      },
      {
        spotId: 10,
        userId: 4,
        review: 'FINALLY! A home large enough to fit my suitcases. The house was creepy though. It had a gothic feel to it and lots of spider webs.',
        stars: 3
      },
      {
        spotId: 10,
        userId: 14,
        review: 'Another great location to hide dalmations...It would have been even better if the spider webs could catch the dogs for me too...I mean...what? 5/5',
        stars: 5
      },
      {
        spotId: 13,
        userId: 9,
        review: 'Cowboy Ranch House was great! Only a few minutes walking distance away from delicious restaurants and a grocery market. The home itself was also clean and tidy.',
        stars: 5
      },
      {
        spotId: 14,
        userId: 14,
        review: 'Way too small! I could not fit all 101 dalma---I mean it could not fit all my luggage. If you need a roomier place to stay, do not come here.',
        stars: 1
      },
      {
        spotId: 14,
        userId: 4,
        review: 'I should have listened to the other reviewer. This place was indeed WAY TOO SMALL!!! I could not fit all my luggage!!! Ugh how does ANYONE stay here?!',
        stars: 1
      },
      {
        spotId: 18,
        userId: 17,
        review: 'Great location for a family. My wife and kids loved it here! We loved that it was what the kids these days called "glamping" so we did not have to fend for ourselves in the woods.',
        stars: 4
      },
      {
        spotId: 22,
        userId: 4,
        review: 'Honestly, Deja-Moo is well-named, because with every new place I stay at...it is deja-moo. Every place is the same...WAY TOO SMALL! How do people live here?!',
        stars: 1
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
