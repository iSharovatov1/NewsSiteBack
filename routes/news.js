var express = require('express');
var router = express.Router();
var passport = require('passport')

const newsController = require('../controllers').news;

router.get('/', passport.authenticate('jwt', {session: false}), newsController.getAllNews);
router.get('/:id', passport.authenticate('jwt', {session: false}), newsController.getNewsById);
router.post('/', newsController.createNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
