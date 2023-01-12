const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);

module.exports = router;


