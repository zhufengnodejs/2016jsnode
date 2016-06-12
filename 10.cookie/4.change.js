var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// visit=1
app.get('/visit',function(req,res){
    //1. 判断客户端是不是第一次访问
    if(req.cookies.visit){//如果有visit则不是第一次
        res.cookie('visit',parseInt(req.cookies.visit)+1);//重写一个visit cookie给客户端
        res.end((parseInt(req.cookies.visit)+1)+'');
    }else{
        //如果cookie中没有visit，则意味着是第一次访问
        res.cookie('visit',1);
        res.end('1');
    }
});

app.listen(9090);