const express = require("express");
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')


// App Routes
router.get('/', exerciseController.getExercise)
router.put('exerciseController/markFavorite', exerciseController.markFavorite )  //shooting from the hip here, not sure the route
// router.put('/exercises/:id/unfavorite',)


module.exports= router;


