var express = require('express');
var app = express();
var session = require('express-session');
//set-cookie:connect.sid=s%3AF8-fXCtkMuYof6GDBrZ00SU0NrpwJDDl.s4zkHQ%2BnJliW944orgTJ7mVaUng1pz2DJ%2F6ARz1T8M4; Path=/; HttpOnly
app.use(session({
    secret:'zfpx',//用来加密cookie
    resave:true,//每次请求不管是否修改session数据都会重新保存session数据
    saveUninitialized:true,//保存未初始化的session
}));
app.get('/write',function(req,res){
    req.session.name = 'zfpx';//为session赋值
    res.end('visit');
});
app.get('/read',function(req,res){
    res.send(req.session.name);//从session中取值
});
app.listen(9090);