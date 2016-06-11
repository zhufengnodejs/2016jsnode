var express = require('express');
var util = require('util');
var app = express();
app.use(function(req,res,next){
    req.start = Date.now();
    next();
});
//可以统一设置响应
// 可以对请求和响应进行处理
//可以执行一些公用逻辑，添加响应头，添定自定义的方法
app.use(function(req,res,next){
    res.setHeader('Content-Type','text/html;charset=utf8');
    next();
});
app.use(function(req,res,next){
    var end = res.end;
    res.end = function(val){
       if(Buffer.isBuffer(val) || typeof val == 'string'){
           end.call(res,val);//end方法执行的时候this指针应该指向res
           ///end.bind(res,val)();
       }else{
           end.call(res,util.inspect(val))
           //end.bind(res,util.inspect(val))();
       }
        console.log('cost: ',Date.now() - req.start);
    }

    next();
});
//use 表示使用一个中间件 next表示是否往下匹配
/**
 * 1. 中间能控制请求是否继续向下传递执行，能则调用next,不能则直接end
 * 2. 前一个中间件的处理结果可以被后面的函数使用
 */
app.use('/user',function(req,res,next){
    var random = Math.random();
    console.log(random);
   if(random>0.5){
       req.username = 'zfpx';
       next();//继续执行，往下继续匹配
   }else{
       res.end('over');//直接响应了 不再继续执行了
   }
});

app.get('/',function(req,res){
    res.end({name:'首页'});
});

app.get('/user',function(req,res){
    res.end({name:'用户名: '+req.username});
});

app.listen(9090);