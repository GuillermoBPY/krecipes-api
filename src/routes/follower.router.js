const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require('../controllers/follower.controllers');
const express = require('express');

const routerFollower = express.Router();

routerFollower.route('/').get(getAll).post(create);

routerFollower.route('/:id').get(getOne).delete(remove).put(update);

module.exports = routerFollower;
