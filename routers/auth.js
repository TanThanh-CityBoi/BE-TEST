const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')

router.post("/login", AuthController.login)
router.post("/sign-up", AuthController.register)
router.post("/reset-password", AuthController.resetPassword)

module.exports = router;
