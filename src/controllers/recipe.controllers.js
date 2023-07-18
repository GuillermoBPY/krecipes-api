const catchError = require('../utils/catchError');
const {
  recipe,
  ingredient,
  tag,
  category,
  user,
  rating,
  comment,
  recipesIngredients,
} = require('../models');

const getAll = catchError(async (req, res) => {
  const results = await recipe.findAll({
    include: [
      ingredient,
      tag,
      category,
      {
        model: user,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: rating,
        include: [
          {
            model: user,
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
      {
        model: comment,
        include: [
          {
            model: user,
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
    ],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const { title, description, instructions } = req.body;
  const userId = req.user.id;
  const recipeBody = { title, description, instructions, userId };
  const result = await recipe.create(recipeBody);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await recipe.findByPk(id, {
    include: [
      ingredient,
      tag,
      category,
      {
        model: user,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: rating,
        include: [
          {
            model: user,
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
      {
        model: comment,
        include: [
          {
            model: user,
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await recipe.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await recipe.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setCategories = catchError(async (req, res) => {
  const { id } = req.params;
  const foundRecipe = await recipe.findByPk(id);
  await foundRecipe.setCategories(req.body);
  const categories = await foundRecipe.getCategories();
  return res.json(categories);
});

const setIngredients = catchError(async (req, res) => {
  const { id } = req.params;
  const { ingredientId, amount, unit } = req.body;
  const foundRecipe = await recipe.findByPk(id);
  if (!foundRecipe) return res.sendStatus(404);
  const foundIngredient = await ingredient.findByPk(ingredientId);
  if (!foundIngredient) return res.sendStatus(404);
  const recipeIngredient = await recipesIngredients.create({
    recipeId: foundRecipe.id,
    ingredientId: foundIngredient.id,
    amount: amount,
    unit: unit,
  });

  return res.json(recipeIngredient);
});

const setTags = catchError(async (req, res) => {
  const { id } = req.params;
  const foundRecipe = await recipe.findByPk(id);
  await foundRecipe.setTags(req.body);
  const tags = await foundRecipe.getTags();
  return res.json(tags);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setCategories,
  setIngredients,
  setTags,
};
