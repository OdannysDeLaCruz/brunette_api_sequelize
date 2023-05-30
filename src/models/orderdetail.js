'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'order_id' })
      this.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
  }
  OrderDetail.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};