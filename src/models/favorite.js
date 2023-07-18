'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    static associate(models) {
      favorite.belongsTo(models.user);
      favorite.belongsTo(models.recipe);
    }
  }
  favorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'favorite',
    }
  );
  return favorite;
};
