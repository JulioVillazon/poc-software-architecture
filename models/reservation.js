'use strict';
module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define('reservation', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false    
    },
    classroom_id: {
      type: DataTypes.BIGINT,
      allowNull: false      
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false      
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false      
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Active'
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
  reservation.associate = function(models) {
    // associations can be defined here
  };

  reservation.getByUserId = function (user_id) {
    return reservation.findAll({
      where: {
        user_id,
        status: 'Active'
      }
    })
  }

  reservation.getById = function (id) {
    return reservation.findOne({
      where: {
        id,
        status: 'Active'
      }
    })
  }
  return reservation;
};