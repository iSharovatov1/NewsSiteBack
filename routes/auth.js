const express = require('express');

const router = express.Router();

const { authController } = require('../controllers');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

module.exports = router;
