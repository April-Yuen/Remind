const express = require("express");
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')

router.get('/', exerciseController.getExercise)
router.put('/markFavorite', exerciseController.markFavorite )
router.get('/exercises', exerciseController.exercisesPage)
router.get('/exercises/favorites', exerciseController.favoritesPage)
router.get('/exercises/completed', exerciseController.completedPage)
router.get('/exercises/new', exerciseController.addExercisePage)
router.get('/exercises/:id', exerciseController.exerciseDetails)

module.exports = router


