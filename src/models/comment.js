'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.user);
      comment.belongsTo(models.recipe);
    }
  }
  comment.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      recipeId: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'comment',
    }
  );
  return comment;
};
