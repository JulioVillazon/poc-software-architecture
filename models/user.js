'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', { 
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: false
  });
  user.associate = function(models) {
    // associations can be defined here
  };

  user.validateCredentials = function (password, email) {
    return user.findOne({
      where: {
        password,
        email
      }
    })
  }

  user.getById = function (id) {
    return user.findOne({
      where: {
        id        
      }
    })
  }

  return user;
};