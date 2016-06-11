var express = require('express');
var app = express();//调用函数可以得到应用对象app

/**
 * 配置路由
 * get 表示请求的方法
 * '/' 表示请求的路径
 * function 代表当请求到来的时候执行的回调函数
 * 路由的特点是一旦匹配就不再往下继续匹配了
 */
app.get('/',function(req,res){
    res.end('homepage');
});
//不考虑请求的方法，只匹配路径
app.all('/user',function(req,res){
    res.end('user');
});

//不考虑方法，也不考虑路径
app.all('*',function(req,res){
    res.end('404');
});

app.listen(9090);