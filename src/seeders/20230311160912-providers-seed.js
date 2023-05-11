'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const providers = [0,1,2,3,4,5,6,7,8,9].map(() => {
      return {
        name: faker.commerce.productName(),
        store_id: Math.floor(Math.random() * (3 - 1)) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return queryInterface.bulkInsert('Providers', providers)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Providers', null, {});
  }
};
