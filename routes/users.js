var express = require('express');
var router = express.Router();
const newsController = require('../controllers').News;

console.log(newsController.getById);

router.get('/users', newsController.list);
router.get('/users/:id', newsController.getById);
router.post('/users', newsController.add);
router.put('/users/:id', newsController.update);
router.delete('/users/:id', newsController.delete);

module.exports = router;
