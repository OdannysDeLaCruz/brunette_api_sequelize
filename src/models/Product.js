'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Store, { foreignKey: 'store_id' }) 
      this.belongsTo(models.Brand, { foreignKey: 'brand_id' }) 
      this.belongsTo(models.Category, { foreignKey: 'category_id' })
      this.hasMany(models.OrderDetail)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    original_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true,
  });
  return Product;
};