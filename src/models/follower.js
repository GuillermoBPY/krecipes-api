'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follower extends Model {
    static associate(models) {
      follower.belongsTo(models.user);
    }
  }
  follower.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'follower',
    }
  );
  return follower;
};
