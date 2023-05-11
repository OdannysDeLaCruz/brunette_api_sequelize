'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategories extends Model {
    static associate(models) {}
  }

  ProductCategories.init({
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'ProductCategories',
  });
  return ProductCategories;
};