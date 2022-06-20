var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('1111')
});

router.post('/', function(req, res, next) {
  console.log(1113);
  res.send('1111')
});

module.exports = router;
