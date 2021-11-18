'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserDetails', [{
      firstName: "ASDF",
      lastName: "FDSA",
      balance:"200000",
      UserId:5,
      birthDate:"04-06-1999",
      gender: "Male",
      address: "JalanBerbahagia",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserDetails')
  }
};
