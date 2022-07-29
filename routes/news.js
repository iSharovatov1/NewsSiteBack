const express = require('express');
const passport = require('passport');

const { newsController } = require('../controllers');

const router = express.Router();

router.get('/', newsController.getAllNews);
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), newsController.getNewsByUser);

module.exports = router;
