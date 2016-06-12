/**
 * 1. 当客户端第一次访问服务器的时候，服务器会发送cookie给客户端。响应头 Set-Cookie,客户端收到cookie会后把它存放在本地
 * 2. 当客户端第二次访问服务器的时候，客户端会把上次保存的cookie重新发送给服务器端 请求头 Cookie
 *
 */
var url = require('url');
var http = require('http');
var querystring = require('querystring');
http.createServer(function(req,res){
   var urlObj = url.parse(req.url);
   var pathname = urlObj.pathname;
   if(pathname =='/write'){
       //通过响应头中的Set-Cookie可以向客户端写cookie
       res.setHeader('Set-Cookie',"name=zfpx");
       res.end('ok');
   } else if(pathname =='/read'){
        // name=zfpx
       //读取请求头中的cookie字段
       var cookies = querystring.parse(req.headers.cookie);
       res.end(JSON.stringify(cookies));
   }

}).listen(9090);