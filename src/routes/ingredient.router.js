const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require('../controllers/ingredient.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerIngredient = express.Router();

routerIngredient.route('/').get(getAll).post(verifyJWT, create);

routerIngredient
  .route('/:id')
  .get(getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerIngredient;
