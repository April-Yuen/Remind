const express = require("express");
const router = express.Router();
const { loginPage, signUpPage } = require('../controllers/authController')

router.get('/login', loginPage);
router.get('/sign-up', signUpPage);

module.exports = router;


