'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    static associate(models) {
      this.belongsTo(models.Store, { foreignKey: 'store_id' })
    }
  }
  Permissions.init({
    permission: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permissions;
};