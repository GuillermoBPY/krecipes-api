require('dotenv').config();
const catchError = require('../utils/catchError');
const { user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = catchError(async (req, res) => {
  const results = await user.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await user.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await user.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await user.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await user.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const userLogged = await user.findOne({ where: { email } });
  if (!userLogged) return res.sendStatus(401);
  const isValidPassword = await bcrypt.compare(password, userLogged.password);
  if (!isValidPassword) return res.sendStatus(401);
  const token = jwt.sign({ userLogged }, process.env.TOKEN_SECRET, {
    expiresIn: '1d',
  });
  return res.json({ userLogged, token });
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  login,
};
