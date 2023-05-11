'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsTo(models.Store, { foreignKey: 'store_id' })
      this.belongsToMany(models.Product, { 
        through: 'ProductCategories'
      })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    parentId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};