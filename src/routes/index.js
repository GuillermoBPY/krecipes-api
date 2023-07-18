const express = require('express');
const routerUser = require('./user.router');
const routerRecipe = require('./recipe.router');
const routerCategory = require('./category.router');
const routerIngredient = require('./ingredient.router');
const routerComment = require('./comment.router');
const routerFavorite = require('./favorite.router');
const routerFollower = require('./follower.router');
const routerRating = require('./rating.router');
const routerTag = require('./tag.router');
const verifyJWT = require('../utils/verifyJWT');
const router = express.Router();

router.use('/categories', routerCategory);
router.use('/comments', routerComment);
router.use('/favorites', verifyJWT, routerFavorite);
router.use('/followers', verifyJWT, routerFollower);
router.use('/ingredients', routerIngredient);
router.use('/ratings', routerRating);
router.use('/recipes', routerRecipe);
router.use('/tags', routerTag);
router.use('/users', routerUser);

module.exports = router;
