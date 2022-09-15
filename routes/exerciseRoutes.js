const express = require("express");
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')

router.get('/', exerciseController.getExercise)
router.get('/add-video', exerciseController.addVideo)
router.post('/add-video', exerciseController.addVideoOnPost)
router.get('/exercise/:id', exerciseController.exerciseDetails)
router.post('/add-video', exerciseController.addVideoOnPost)
router.put('/markFavorite', exerciseController.markFavorite )  //shooting from the hip here, not sure the route
router.get('/exercises', exerciseController.exercisesPage)
router.get('/exercises/favorites', exerciseController.favoritesPage)
router.get('/exercises/completed', exerciseController.completedPage)
router.get('/exercises/new', exerciseController.addExercisePage)
router.get('/exercises/:id', exerciseController.exerciseDetails)
// router.put('/exercises/:id/unfavorite',)


module.exports = router


