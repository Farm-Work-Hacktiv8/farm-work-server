'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlantField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PlantField.init({
    fieldId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlantField',
  });
  return PlantField;
};