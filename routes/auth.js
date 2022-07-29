const express = require('express');

const { authController } = require('../controllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

module.exports = router;
