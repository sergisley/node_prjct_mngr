var express = require('express');
var router = express.Router();


router.put('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
