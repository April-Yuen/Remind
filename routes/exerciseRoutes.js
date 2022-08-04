const express = require("express");
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')


// App Routes
router.get('/', exerciseController.getExercise)
// router.put('/exercises/:id/favorite', )
// router.put('/exercises/:id/unfavorite',)


module.exports= router;


