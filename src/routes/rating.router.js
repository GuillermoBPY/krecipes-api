const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require('../controllers/rating.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerRating = express.Router();

routerRating.route('/').get(getAll).post(verifyJWT, create);

routerRating
  .route('/:id')
  .get(getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerRating;
