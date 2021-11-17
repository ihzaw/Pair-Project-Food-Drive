'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    static associate(models) {
      UserDetail.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  UserDetail.init({
    id: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    birthDate: DataTypes.DATE,
    gender: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};