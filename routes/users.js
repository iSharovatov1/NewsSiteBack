var express = require('express');
var router = express.Router();

const newsController = require('../controllers').news;

router.get('/api/news', newsController.list);
router.get('/api/news/:id', newsController.getById);
router.post('/api/news', newsController.add);
router.put('/api/news/:id', newsController.update);
router.delete('/api/news/:id', newsController.delete);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
