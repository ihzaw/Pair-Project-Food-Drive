'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let admin = {
      username: "admin",
      email: "admin@admin.com",
      password: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "admin"
    }
    return queryInterface.bulkInsert('Users', [admin])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users')
  }
};
