const express = require("express");
const router = express.Router(); //Helps handle our routing
const exerciseController = require('../controllers/exerciseController')
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //makes sure logged in

router.get('/', exerciseController.getIndex)
router.get('/posts', ensureAuth, exerciseController.getExercise)
router.get('/add-video', ensureAuth, exerciseController.addVideo)
router.post('/add-video',ensureAuth, exerciseController.addVideoOnPost)
router.put('/markFavorite',ensureAuth, exerciseController.markFavorite)
router.put('/markNotFavorite',ensureAuth, exerciseController.markNotFavorite)
router.put('/markComplete',ensureAuth, exerciseController.markComplete)
router.put('/markinComplete',ensureAuth, exerciseController.markIncomplete)
router.get('/exercises', ensureAuth, exerciseController.exercisesPage)
router.get('/exercises/favorites',ensureAuth, exerciseController.favoritesPage)
router.get('/exercises/completed',ensureAuth, exerciseController.completedPage)
router.get('/exercises/new',ensureAuth, exerciseController.addExercisePage)
router.get('/exercises/:id',ensureAuth, exerciseController.exerciseDetails)

module.exports = router


