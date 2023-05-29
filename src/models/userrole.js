'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
      this.belongsTo(models.Role, { foreignKey: 'role_id' })
    }
  }
  UserRole.init({
    role_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};