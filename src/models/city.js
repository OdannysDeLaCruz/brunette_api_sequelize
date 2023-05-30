'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      this.belongsTo(models.State, { foreignKey: 'state_id' })
    }
  }
  City.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};