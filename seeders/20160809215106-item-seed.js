'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('items', [
    {
      userId: 1, 
      name: 'Camping backpack',
      category: 'Outdoor Fun',
      description: '50L overnight backpacking pack. Medium size, fits most people 5"4\' to 5"6\'',
      imageUrl: 'http://www.campsaver.com/media/catalog/product/o/s/osprey_aura_50_7.jpg',
      active: true,
      borrowed: true,
      borrowerID: 2,
      dateBorrowed: new Date(2016, 6, 20),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2, 
      name: 'Drill',
      category: 'Tools',
      description: '18 volt. All size bits included for drilling and screwing.',
      imageUrl: 'http://www.workshopaddict.com/tools/wp-content/uploads/2015/05/Ridgid_Gen5X_Drill.jpg',
      active: true,
      borrowed: true,
      borrowerID: 1,
      dateBorrowed: new Date(2016, 7, 25),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3, 
      name: 'Bunt Cake Pan',
      category: 'Kitchen',
      description: '12" buntcake pan, metal, non-stick.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Bundt_cake_pan.jpg',
      active: true,
      borrowed: false,
      borrowerID: null,
      dateBorrowed: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2, 
      name: 'Alcove',
      category: 'Outdoor Fun',
      description: 'Cover for a picnic or event. must be staked into the ground. 10" tall, 6" by 6" coverage. Panel for 2 sides to deflect wind.',
      imageUrl: 'http://cdn.outdoorgearlab.com/photos/13/52/256750_27198_XL.jpg',
      active: true,
      borrowed: false,
      borrowerID: null,
      dateBorrowed: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2, 
      name: 'JetBoil Coffee Press',
      category: 'Outdoor Fun',
      description: '2c jetboil with a coffee press adaptor. Gas not included. Please only water in this jetboil, no food.',
      imageUrl: 'http://whatsinyourpack.com/wp-content/uploads/2014/09/jetboil_coffee_press-337x400.jpg',
      active: true,
      borrowed: false,
      borrowerID: null,
      dateBorrowed: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1, 
      name: 'Daring Greatly',
      category: 'media',
      description: 'Daring Greatly: How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead. Book by Brené Brown',
      imageUrl: 'https://tedconfblog.files.wordpress.com/2012/09/daringgreatly_final525-resized-600.png',
      active: true,
      borrowed: true,
      borrowerID: 4,
      dateBorrowed: new Date(2016, 3, 2),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3, 
      name: 'Exploding Kittens (NSFW)',
      category: 'Indoor Fun',
      description: 'Fun card game for 2-5 adults. Super random, great for parties where you don\'t want a lot of strategy. (dirty.. not safe for work or children)',
      imageUrl: 'http://explodingkittens.com/img/order/nsfwbox.png',
      active: true,
      borrowed: true,
      borrowerID: 2,
      dateBorrowed: new Date(2016, 7, 18),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 4, 
      name: '3 person tent',
      category: 'Outdoor Fun',
      description: 'Semi- lightweight tent that comfortably fits 2 ppl, but can fit 3 if needed. Mesh top, but has a cover.',
      imageUrl: 'http://image.geartrade.com/userimages/1/6/1633711560557fa008dc720.jpg',
      active: true,
      borrowed: true,
      borrowerID: 3,
      dateBorrowed: new Date(2016, 8, 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 4, 
      name: 'Electric Piano',
      category: 'Indoor Fun',
      description: 'Lightweight electric piano with stand. Has different sound options and effects and teaches you songs. Beginner piano books can be included',
      imageUrl: 'http://www.playingapiano.com/wp-content/uploads/2014/06/electric-piano1-300x160.jpg',
      active: true,
      borrowed: true,
      borrowerID: 3,
      dateBorrowed: new Date(2016, 8, 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ],{});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('items', null, {});
  }
};
