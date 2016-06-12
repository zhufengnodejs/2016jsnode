/**
 * 1. 当客户端第一次访问服务器的时候
 *   1.1 服务器生成一个 session.sid 一定是随机的，不容易被模拟和猜测出来
 *   1.2 为这个session.sid在服务器开辟一个空间进行存储，存储sid和一个对象的对应的关系
 *   1.3 服务器通过cookie把这个sid发给客户端，客户端保存到本地
 * 2. 当客户端再次访问的时候，会把cookie中的sid带上。
 *   2.1 服务器就可以得到此sid,然后找出来此sid对应的数据对象
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
//存储session的对象
var sessions = {};
//跟客户端约定好的会话key
const SESSION_KEY = 'cardno';
app.get('/visit',function(req,res){
    var sid = req.cookies[SESSION_KEY];
    if(sid){
        var sessionObj = sessions[sid];//得到会话对象，也就是此客户端在服务器存储的数据对象
        //扣10块钱，理一次发一次10块钱
        sessionObj.money = sessionObj.money - 10;
        res.send('欢迎你再次光临，你的理发卡还剩'+sessionObj.money+'元');
    }else{
        //为当前客户端生成一个新的sessionId
        var sessionId = Date.now()+Math.random();
        //在服务器记录sessionId和数据对象的对应关系
        sessions[sessionId] = {
            money:100,
            name:'张三'
        };
        //通过cookie发送给客户端了
        res.cookie(SESSION_KEY,sessionId);
        res.send('欢迎你第一次光临，送你一张价值100元的理发卡');
    }

});

app.listen(9090);