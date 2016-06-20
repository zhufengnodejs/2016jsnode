var express = require('express');
var router = express.Router();
var http = require('http');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next) {
  var user = req.body;
  var request = http.request({
    host:'localhost',
    port:4000,
    path:'/',
    method:'post',
    headers:{'Content-Type':'application/json'}
  },function(response){

  });
  request.write(JSON.stringify(user));
  request.end();
  res.end();
});

module.exports = router;
