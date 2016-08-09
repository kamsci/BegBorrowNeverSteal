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
