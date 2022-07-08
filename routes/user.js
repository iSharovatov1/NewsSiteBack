const express = require('express');

const router = express.Router();
const passport = require('passport');

const userController = require('../controllers').user;

router.put('/', passport.authenticate('jwt', { session: false }), userController.updateUser);

module.exports = router;
