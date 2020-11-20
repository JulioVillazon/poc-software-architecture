var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Health Check. */
router.get('/health', async function(req, res, next) {    
  res.sendStatus(200);
});

module.exports = router;
