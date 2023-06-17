'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [0,1,2,3,4,5,6,7,8,9].map(() => {
      const name = faker.commerce.productName()
      return {
        name: name,
        slug: name.toLowerCase().replaceAll(' ', '-'),
        parent_id: null,
        store_id: Math.floor(Math.random() * (3 - 1)) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return queryInterface.bulkInsert('Categories', categories)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
