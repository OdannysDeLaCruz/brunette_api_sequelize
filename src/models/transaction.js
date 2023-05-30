'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'order_id' })
      this.belongsTo(models.UserPaymentMethod, { foreignKey: 'user_payment_method_id' })
    }
  }
  Transaction.init({
    transaction_status: DataTypes.STRING,
    transaction_response: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};