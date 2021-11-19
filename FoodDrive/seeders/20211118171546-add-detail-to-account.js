'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserDetails', [{
      firstName: "Ihza",
      lastName: "Anantama",
      balance:"90000000",
      UserId: 4,
      birthDate:"04-06-1999",
      gender: "Male",
      address: "Gang yg Asik Banget",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserDetails')
  }
};
