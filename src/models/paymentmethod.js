'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {
      this.belongsTo(models.Store, { foreignKey: 'store_id' })
    }
  }
  PaymentMethod.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};