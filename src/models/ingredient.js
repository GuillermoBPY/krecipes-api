'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    static associate(models) {
      ingredient.belongsToMany(models.recipe, {
        through: models.recipesIngredients,
      });
    }
  }
  ingredient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ingredient',
    }
  );
  return ingredient;
};
