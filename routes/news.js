const express = require('express');

const router = express.Router();

const { newsController } = require('../controllers');

router.get('/', newsController.getAllNews);
router.get('/byUserId/:id', newsController.getNewsByUser);

module.exports = router;
