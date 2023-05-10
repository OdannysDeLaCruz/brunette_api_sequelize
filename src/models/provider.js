'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    static associate(models) {
      this.belongsTo(models.Store)
      this.hasMany(models.Brand, { 
        foreignKey: 'provider_id'
      })
    }
  }
  Provider.init({
    name: DataTypes.STRING,
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Provider',
  });
  return Provider;
};