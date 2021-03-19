'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plant.belongsToMany(models.Field, { through: "PlantFields", foreignKey: 'plantId' });

    }
  };
  Plant.init({
    plantName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Plant name is required.'
        }
      }
    },
    harvestTime: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Harvest time is required.'
        },
        min: {
          args: 1,
          msg: 'Harvest time should be greater than 1 day.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Plant',
  });
  return Plant;
};