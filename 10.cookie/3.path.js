var express = require('express');
var app = express();
//cookieParser 的作用是把请求中的cookie取出来转成对象赋给req.cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());
//向客户端写cookie
app.get('/write',function(req,res){
   //指定此cookie属于哪个路径，如果访问指定路径的话就发送cookie,如果访问的不是指定路径的话就不发送
    //res.cookie('name','zfpx',{path:'/read1'});
    //设置此cookie的绝对过期时间
    //res.cookie('name','zfpx',{expires:new Date(Date.now()+20*1000)});
    //设置有效的时间，相当于开启了一个倒计时
    //res.cookie('name','zfpx',{maxAge:20*1000});

    //设置httpOnly之后中，不能通过浏览器的js来操作cookie
    res.cookie('name','zfpx',{httpOnly:true});
    res.cookie('age','8',{httpOnly:true});
    res.send('ok');
});
//读取cookie
app.get('/read1',function(req,res){
    res.send(req.cookies);
});
//读取cookie
app.get('/read2',function(req,res){
    res.send(req.cookies);
});
app.get('/clear',function(req,res){
    //清除指定的cookie
    res.clearCookie('name');
    res.end('d');
});

app.listen(9090);