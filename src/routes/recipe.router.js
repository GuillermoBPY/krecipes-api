const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setCategories,
  setIngredients,
  setTags,
} = require('../controllers/recipe.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerRecipe = express.Router();

routerRecipe.route('/').get(getAll).post(verifyJWT, create);

routerRecipe
  .route('/:id')
  .get(getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

routerRecipe.route('/:id/categories').post(verifyJWT, setCategories);

routerRecipe.route('/:id/ingredients').post(verifyJWT, setIngredients);

routerRecipe.route('/:id/tags').post(verifyJWT, setTags);

module.exports = routerRecipe;
