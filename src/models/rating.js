'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    static associate(models) {
      rating.belongsTo(models.user);
      rating.belongsTo(models.recipe);
    }
  }
  rating.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      recipeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'recipe',
          key: 'id',
        },
      },
      score: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'rating',
    }
  );
  return rating;
};
