'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Field)
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "First Name cannot be NULL"},
        notEmpty: {msg: "First Name cannot be Empty"}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Last Name cannot be NULL"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Email cannot be NULL"},
        notEmpty: {msg: "Email cannot be Empty"},
        isEmail: {msg: "Invalid Email Format"}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Username cannot be NULL"},
        notEmpty: {msg: "Username cannot be Empty"},
        len: {
          args: 4,
          msg: 'Username must contain at leats 4 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Password cannot be NULL"},
        notEmpty: {msg: "Password cannot be Empty"},
        len: {
          args: 6,
          msg: 'Password must contain at leats 6 characters'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        if(user.lastName === null){
          user.lastName = ''
        }
      }
    }
  });
  return User;
};