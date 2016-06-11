var express = require('express');
var util = require('util');
var app = express();
/**
 * 在真正的业务处理之前执行的中间环节
 * 路由和中间间都是函数,而且 他们会放在一个数组中,匹配执行的时候按顺序依次执行
 * 中间件多了一个next参数，如果调用next表示继续执行，如果不调用表示在当前中间件中止执行
 *
 */
app.use(function(req,res,next){
    req.start = Date.now();//把此请求的开始时间追加到req的start属性上
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
    var end = res.end;//备份了原来的end方法的引用地址
    //重写了end方法
    res.end = function(val){
       if(Buffer.isBuffer(val) || typeof val == 'string'){
           end.call(res,val);//end方法执行的时候this指针应该指向res
       }else{
           //为了改变end方法执行的时候this指针 .指向response
           end.call(res,util.inspect(val))
       }
        //end方法调用的时候表示响应结束
        //此时可以用当前的时间减去请求开始的时间就可以得到时间差
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