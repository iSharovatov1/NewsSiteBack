const express = require('express');

const router = express.Router();
const passport = require('passport');

const newsController = require('../controllers').news;

router.get('/', newsController.getAllNews);
router.post('/', passport.authenticate('jwt', { session: false }), newsController.createNews);
router.put('/:id', passport.authenticate('jwt', { session: false }), newsController.updateNews);
router.delete('/:id', passport.authenticate('jwt', { session: false }), newsController.deleteNews);

module.exports = router;
