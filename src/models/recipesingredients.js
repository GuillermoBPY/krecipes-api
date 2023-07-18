'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipesIngredients extends Model {
    static associate(models) {
      recipesIngredients.belongsTo(models.recipe, {
        foreignKey: 'recipeId',
      });
      recipesIngredients.belongsTo(models.ingredient, {
        foreignKey: 'ingredientId',
      });
    }
  }
  recipesIngredients.init(
    {
      recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'recipesIngredients',
      tableName: 'recipesIngredients',
    }
  );
  return recipesIngredients;
};
