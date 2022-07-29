const express = require('express');
const passport = require('passport');

const { userController } = require('../controllers');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);

module.exports = router;
