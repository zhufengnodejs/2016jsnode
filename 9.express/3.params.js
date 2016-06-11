var express = require('express');
var app = express();
/**
 * 请求行 方法 路径 协议/版本号
 * 请求头 key-value
 * 请求体
 */
/*app.use(function(req,res,next){
    var urlObj = require('url').parse(req.url,true);  //端口号和问号(查询字符串)中间那部分
    req.path = urlObj.pathname;
    req.query = urlObj.query;
    next();
});*/
//:代表路径参数 /users/(\w+)
// req.params {}  id name
//路径 不但可以写字符串，也可以写带占位符的字符串，还可以写下则
/*
app.get(/\/home\/\w+\/\w+/,function(req,res){
    console.log(req.path);//取得path路径
    console.log(req.params);//取得参数对象
    //console.log(req.params[0]);//name
    //console.log(req.params[1]);//age
    res.end('ok');
});
*/
//路径参数 把参数放在路径里面，会得到req.params对象
// key 就是占位符， value是实际请求时的url中的字符串
// /users/8/zfpx  => req.params = {id:8,name:'zfpx'}
app.get('/users/:id/:name',function(req,res){

 res.end(req.params.id+req.params.name);
});
// get  /user?name=zfpx
// method=get path= /user headers 请求头对象 query {name:'zfpx'}
app.get('*',function(req,res){
    console.log(req.method);//方法名
    console.log(req.path);//路径名
    console.log(req.headers);//请求头对象
    console.log(req.query);//请求查询字符串对象
    res.end('ok')
});
app.listen(9090);
