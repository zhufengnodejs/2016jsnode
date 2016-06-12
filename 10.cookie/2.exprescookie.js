var express = require('express');
var app = express();
//cookieParser 的作用是把请求中的cookie取出来转成对象赋给req.cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());
//向客户端写cookie
app.get('/write',function(req,res){
    //写 cookie此方法由express提供
    //如果指定了域名，则意味着此cookie只属于此域名，如果向别的域名发送请求的话，此cookie不发送
    res.cookie('name','zfpx',{domain:'a.zfpx.cn'});
    res.send('ok');
});
//读取cookie
app.get('/read',function(req,res){
    res.send(req.cookies);
});

app.listen(9090);