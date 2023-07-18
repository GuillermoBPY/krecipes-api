'use strict';
const { Model } = require('sequelize');
const recipe = require('./recipe');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    static associate(models) {
      tag.belongsToMany(models.recipe, { through: 'recipesTags' });
    }
  }
  tag.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'tag',
    }
  );
  return tag;
};
