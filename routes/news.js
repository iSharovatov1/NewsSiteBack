const express = require('express');

const router = express.Router();
const passport = require('passport');

const { newsController } = require('../controllers');

router.get('/', newsController.getAllNews);
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), newsController.getNewsByUser);

module.exports = router;
