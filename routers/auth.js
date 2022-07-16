const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../helper/AuthMiddleware')
const AuthController = require('../controllers/AuthController')

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)
router.post("/reset-password", AuthMiddleware, AuthController.resetPassword)

module.exports = router;
