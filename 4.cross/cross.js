var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function(req,res){
   var urlObj = url.parse(req.url,true);
   var pathname = urlObj.pathname;//得到路径名
   var query = urlObj.query;//得到查询字符串对象
    res.setHeader('Access-Control-Allow-Origin','http://localhost:63342');
   if(pathname == '/ajax'){
       //设置响应头， 允许哪个来源访问
       res.end('ajax');
   }else if(pathname == '/post'){
       var result = '';
       req.on('data',function(data){
           result += data;
       });
       req.on('end',function(data){
           res.end(result);
       });

   }else{
     res.end('404');
   }
}).listen(9090,'localhost');