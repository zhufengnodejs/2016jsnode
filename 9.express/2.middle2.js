var express = require('express');
var app = express();
// use方法表示使用一个中间件,中间件函数有三个参数，多了一个next
//调用next表示继续执行，不调用next表示停止继续执行
app.use(function(req,res,next){
  //在此执行一些公用的处理，就是所有路由都需要的处理
  res.setHeader('Content-Type','text/html;charset=utf-8');
    //调用next表示继续执行
  next();
});


app.get('/',function(req,res){
    res.end('欢迎光临');
});


app.get('/index.html',function(req,res){
    res.sendFile('./index.html');
});
app.listen(9090);
