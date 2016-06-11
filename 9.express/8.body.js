var express = require('express');
var querystring = require('querystring');
//请求体处理中间件
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());//处理content-type=application/json的请求体
// extended true表示使用querystring把请求体转成对象
// extended false表示使用此插件自己的转换方法
app.use(bodyParser.urlencoded({extended:true}));//处理contenttype=urlencoded的请求体

//此中间件负责把请求体转成对象赋给req.body
/*app.use(function(req,res,next){
    var result = '';//先初始化空字符串
    req.setEncoding('utf8');//设置编码
    req.on('data',function(data){//接收数据之后把数据累加到result上
        result+= data;//累加
    });
    req.on('end',function(data){
        var contentType = req.headers['content-type'];
        if(contentType == 'application/x-www-form-urlencoded'){
            req.body = querystring.parse(result);//把字符串转成对象
        }else if(contentType == 'application/json'){
            req.body = JSON.parse(result);
        }
        next();
    });
});*/
/**
 * 接收客户端发过来的post请求
 */
app.post('/reg',function(req,res){
    res.send(req.body);
});

app.post('/login',function(req,res){
    res.send(req.body);
});

app.listen(9090);