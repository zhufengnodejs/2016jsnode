
var fs = require('fs');
var mime = require('mime');
var http = require('http');
http.createServer(function(request,response){
   if(request.url == '/3'){
       console.log('333');
       //response.statusCode = 301;//永久重定向
       response.statusCode = 302;//临时重定向
       response.setHeader('Location','/4');//指定新的地址
       response.end('333');
   }else if(request.url == '/4'){
       console.log('444');
       response.end('4');
   }
}).listen(9090);