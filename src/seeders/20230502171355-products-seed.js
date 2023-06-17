'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const products = [0,1,2,3,4,5,6,7,8,9].map(() => {
      return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(1000, 10000),
        original_price: faker.commerce.price(1000, 10000),
        stock: Math.floor(Math.random() * 50),
        description: faker.commerce.productDescription(),
        category_id: Math.floor(Math.random() * (10 - 1)) + 1,
        brand_id: Math.floor(Math.random() * (10 - 1)) + 1,
        store_id: Math.floor(Math.random() * (3 - 1)) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return queryInterface.bulkInsert('Products', products);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
