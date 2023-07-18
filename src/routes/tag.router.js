const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require('../controllers/tag.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerTag = express.Router();

routerTag.route('/').get(getAll).post(verifyJWT, create);

routerTag
  .route('/:id')
  .get(getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerTag;
