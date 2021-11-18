'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.Store, { foreignKey: 'StoreId'})
    }
  };
  Food.init({
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    berat: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false
    },
    StoreId: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};