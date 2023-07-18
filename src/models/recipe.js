'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    static associate(models) {
      recipe.belongsTo(models.user);
      recipe.belongsToMany(models.category, { through: 'recipesCategories' });
      recipe.belongsToMany(models.ingredient, {
        through: models.recipesIngredients,
      });
      recipe.hasMany(models.comment);
      recipe.hasMany(models.rating);
      recipe.hasMany(models.favorite);
      recipe.belongsToMany(models.tag, { through: 'recipesTags' });
    }
  }
  recipe.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      instructions: { type: DataTypes.TEXT, allowNull: false },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
      },
    },
    {
      sequelize,
      modelName: 'recipe',
    }
  );
  return recipe;
};
