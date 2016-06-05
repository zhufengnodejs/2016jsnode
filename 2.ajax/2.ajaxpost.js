var http = require('http');
var fs = require('fs');
//引入解析路径的URL模块
var url = require('url');
var querystring = require('querystring');
http.createServer(function(request,response){
   //把URL从字符串转成对象
   var urlObj = url.parse(request.url);
   //得到端口号和？中间的那部分路径
   var pathname = urlObj.pathname;
   if(pathname == '/'){
       //从文件创建一个可读流
        fs.createReadStream('./2.ajaxpost.html').pipe(response);// response是一个可写流
   }else if(pathname == '/ajax'){
       var result = '';
       //每当有请求体数据到来之后都会触发data事件
       request.on('data',function(data){
           result += data;
       });
       //请求体接收完毕之后会触发end事件
       request.on('end',function(data){
         // result = username=user&password=pwd
         //我们希望把这个字符串转成对象
         //注意 headers是个对象，它里面放的是所有的请求头，全部小写
         var contentType =  request.headers['content-type'];
         var body = {};//body是请求体对象
         if(contentType == 'application/x-www-form-urlencoded'){//如果请求头中的内容类型是urlencoded的话，把此字符串转成对象
            body = querystring.parse(result);
         }else if(contentType == 'application/json'){
            body = JSON.parse(result);
         }
         response.setHeader('Content-Type','application/json');
         response.end(JSON.stringify(body));//把对象转成JSON字符串返回
       });
   }else{
       response.end('404');
   }
}).listen(9090);