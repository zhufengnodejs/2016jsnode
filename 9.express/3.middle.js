var express = require('express');
var util = require('util');
var app = express();
//中央
app.use(function(req,res,next){
    res.setHeader('Content-Type','text/html;charset=utf-8')
    console.log('中央');
   req.money = 100;
    next();
});
//省
app.use(function(req,res,next){
    req.money = req.money - 20;
    console.log('省');
    next('丢了');
});
//市
app.use(function(req,res,next){
    console.log('市');
    req.money = req.money-40;
    next();
});
//村
app.use(function(req,res,next){
    console.log('村');
    req.money = req.money - 40;
    next();
});
//错误处理中间件呢， 这个中间件是专门用来处理错误的
app.use(function(err,req,res,next){
    console.error('错误处理中间件',err);
    res.end('系统出错啦，程序员正在处理，请耐心等明年再来吧');
});
//农民
app.get('/',function(req,res){
    console.log('农民');
    res.end("你的补贴款为: "+req.money);
});
app.listen(9090);