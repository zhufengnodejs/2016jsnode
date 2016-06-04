/**
 * 通过node在电脑上创建一个HTTP的服务器
 * 1 HTTP 只能接收HTTP请求
 * 2 服务器 能在特定IP特定端口上监听客户端的连接
 **/
var fs = require('fs');
var http = require('http');//核心模块，直接加载即可
//创建一个HTTP服务器，并在客户端连接到来的时候执行回应的回调函数
// request 代表客户端的请求，可以从中读取请求中的数据
// response 代表向客户端发的响应 可以通过它向客户端发响应
http.createServer(function(request,response){
  //解析客户端的请求路径，根据不同的路径返回不同的响应
  var url = request.url;
   //当访问服务器的路径是/index.html的时候
  if(url =='/index.html'){
     //读取文件的内容并且写到响应里去
     fs.readFile('./index.html',function(err,data){
         response.end(data);
     })
     //如果客户端请求的路径是style.css的话
  }else if(url == '/style.css'){
     //增加响应头，告诉浏览器响应的类型是什么
     response.setHeader('Content-Type','text/css');
     fs.readFile('./style.css',function(err,data){
        response.end(data);
     })
  }else if(url == '/index.js'){
     response.setHeader('Content-Type','application/x-javascript');
     fs.readFile('./index.js',function(err,data){
        response.end(data);
     })
  }else{
     response.end('404');
  }

//listen EADDRINUSE 端口号被占用
}).listen(9090);//在本机的9090端口上进行监听

/**
 * 运行在服务器端，就是不发送给客户端浏览器运行的就叫服务器端代码
 * 发送给浏览器，在浏览器中运行的代码就叫客户端代码
 *
 **/