'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      this.belongsTo(models.Store, { foreignKey: 'store_id' })
    }
  }
  Roles.init({
    role: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Roles;
};