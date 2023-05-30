'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPaymentMethod extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
      this.belongsTo(models.PaymentMethod, { foreignKey: 'payment_method_id' })
      this.hasMany(models.Transaction)
    }
  }
  UserPaymentMethod.init({
    user_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPaymentMethod',
  });
  return UserPaymentMethod;
};