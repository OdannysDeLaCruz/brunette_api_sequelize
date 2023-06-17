'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsTo(models.Store, { foreignKey: 'store_id' })
      this.hasMany(models.Product, { foreignKey: 'category_id' })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    parent_id: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};