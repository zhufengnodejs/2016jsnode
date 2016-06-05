var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function(req,res){
   var urlObj = url.parse(req.url,true);
   var pathname = urlObj.pathname;//得到路径名
   var query = urlObj.query;//得到查询字符串对象
   if(pathname == '/calc'){
       var result = parseInt(query.a) + parseInt(query.b);//得到a b并且执行相加
       var cb = query.cb;
       res.end(cb+'('+result+')');
   }else{
       res.end('404');
   }
}).listen(9090,'localhost');