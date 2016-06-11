var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
//静态文件服务中间件
// 1. 处理的是静态文件 html css images gif jpg js
// 2. 服务中间件 当客户端请求静态文件的时候，它能进行服务或者叫响应
//使用中间件并指定静态文件的根目录
/**
 * 中间件自己先判断一下，public下有没有对应的静态文件
 * 如果有，读出来并响应结束请求
 * 如果没有，调用next继续执行
 */
app.use(function(req,res,next){
   //1. 判断文件是否存在 当前目录+public+请求的路径名
   //2. 存在则读出文件并返回
   // 3.不存在则next
    var filePath = path.join(__dirname,'public',req.path);//先得到文件的路径
    //判断文件是否存在，如果存在的话
   fs.exists(filePath,function(exist){
        if(exist){
            res.sendFile(filePath);//把此文件发送给客户端
        }else{
            next();//自己搞不定，交给后面来处理
        }
   })
});
//app.use(express.static(path.join(__dirname,'public')));
app.get('/6.png',function(req,res){
    console.log('over');
    res.end('6.png');
});
app.listen(9090);