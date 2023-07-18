const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require('../controllers/comment.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerComment = express.Router();

routerComment.route('/').get(getAll).post(verifyJWT, create);

routerComment
  .route('/:id')
  .get(getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerComment;
