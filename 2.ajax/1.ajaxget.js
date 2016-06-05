var http = require('http');
var fs = require('fs');
//引入解析路径的URL模块
var url = require('url');
http.createServer(function(request,response){
   //把URL从字符串转成对象
   var urlObj = url.parse(request.url);
   //得到端口号和？中间的那部分路径
   var pathname = urlObj.pathname;
   if(pathname == '/'){
       //从文件创建一个可读流
        fs.createReadStream('./1.ajaxget.html').pipe(response);// response是一个可写流
   }else if(pathname == '/ajax'){
       response.statusCode = 200;
       response.end('ajax');
   }else{
       response.end('404');
   }
}).listen(9090);