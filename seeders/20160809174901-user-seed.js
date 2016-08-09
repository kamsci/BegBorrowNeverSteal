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

    return queryInterface.bulkInsert('users', [
      {
        firstName:"Amy",
        lastName:"Hirtzville", 
        email:"amy@gmail.com",
        phone:"255-333-4567",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:"Jon",
        lastName:"Rogers", 
        email:"jr@notgmail.net",
        phone:"255-665-1221",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:"Travis",
        lastName:"Thims", 
        email:"thims@yahoo.com",
        phone:"345-678-9999",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
