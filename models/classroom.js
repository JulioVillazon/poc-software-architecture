'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('classroom', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    properties: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '{}'
    }
  }, {
    timestamps: false
  });
  classroom.associate = function(models) {
    // associations can be defined here
  };

  classroom.getById = function (id) {
    return classroom.findOne({
      where: {
        id        
      }
    })
  }
  return classroom;
};