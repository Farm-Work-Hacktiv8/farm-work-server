'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Field.belongsToMany(models.Plant, { through: "PlantFields", foreignKey: 'fieldId' });
    }
  };
  Field.init({
    fieldName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Field name is required.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Field',
  });
  return Field;
};