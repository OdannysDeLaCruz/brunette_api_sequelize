'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      this.belongsTo(models.Provider, { foreignKey: 'provider_id' })
      this.belongsTo(models.Store, { foreignKey: 'store_id' })
      this.hasMany(models.Product, { foreignKey: 'brand_id' })
    }
  }
  Brand.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};