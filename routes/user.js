const express = require('express');

const { userController } = require('../controllers');
const passport = require('passport');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);

module.exports = router;
