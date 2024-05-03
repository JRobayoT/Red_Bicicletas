/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
