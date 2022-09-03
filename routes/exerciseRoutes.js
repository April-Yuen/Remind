const express = require("express");
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')


// App Routes
router.get('/', exerciseController.getExercise)
router.get('/add-video', exerciseController.addVideo)
router.post('/add-video', exerciseController.addVideoOnPost)
// router.put('/exercises/:id/favorite', )
// router.put('/exercises/:id/unfavorite',)


module.exports= router;


