'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
      this.belongsTo(models.ShippingAddresses, { foreignKey: 'shpping_address_id' })
      this.belongsTo(models.Store, { foreignKey: 'store_id' })
      this.hasMany(models.OrderDetail)
    }
  }
  Order.init({
    total: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};