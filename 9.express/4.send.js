var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
/**
 * 中间件有三个参数 中间件里能决定是否继续 next
 * 路由有两个参数 不能决定是否继续，肯定会停止执行
 */
app.get('/',function(req,res){
    res.send('homepage');
});

app.get('/user',function(req,res){
    //当浏览器不能服务器返回的content-type的时候，则会自动下载，要求
    //用户自己下载完成后自己处理
    res.send(new Buffer('user'));
});

app.get('/book',function(req,res){
    //如果参数是对象的话，只能用send方法，里面会把对象专成字符中再传入res.end方法
    res.send({name:'javascript'});
});
app.get('/status',function(req,res){
    //如果要返回一个状态 码，不要再用send了，要用sendStatus
    //如果真要返回一个数字,要用引号引起来转成字符
    res.send(''+404);
});
app.get('/index.html',function(req,res){
 /*读文件写入流
   fs.readFile('./index.html',function(err,data){
     res.end(data);
 })*/
    //流的方式
  //fs.createReadStream('./index.html').pipe(res);
  //1.可以把文件内容发给客户端， 2 可以帮我们设置响应头contenttype 编码
   //res.sendFile(path.resolve(__dirname,'index.html'));
    res.sendFile('./index.html',{root:__dirname});
});

app.listen(9090);