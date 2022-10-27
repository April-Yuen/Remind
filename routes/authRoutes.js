const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')

router.get('/login', authController.loginPage);
router.get('/signup', authController.signUpPage);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);

module.exports = router;


