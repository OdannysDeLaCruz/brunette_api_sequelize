'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingAddresses extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
      this.hasOne(models.City, { foreignKey: 'city_id' })
      this.hasOne(models.State, { foreignKey: 'state_id' })
      this.hasMany(models.Order)
    }
  }
  ShippingAddresses.init({
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ShippingAddresses',
  });
  return ShippingAddresses;
};