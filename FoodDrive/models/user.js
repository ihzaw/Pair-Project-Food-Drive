'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserDetail, { foreignKey: 'UserId'})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (instance, option) =>{
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
        instance.role = 'User'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};