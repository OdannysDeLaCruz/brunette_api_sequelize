'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermisions extends Model {
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: 'role_id' })
      this.belongsTo(models.Permission, { foreignKey: 'permission_id' })
    }
  }
  RolePermisions.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolePermisions',
  });
  return RolePermisions;
};