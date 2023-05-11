'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      this.hasMany(models.Provider, { foreignKey: 'store_id' })
      this.hasMany(models.Brand, { foreignKey: 'store_id' })
      this.hasMany(models.Product, { foreignKey: 'store_id' }) 
      this.hasMany(models.Category, { foreignKey: 'store_id' })
    }
  }
  Store.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};