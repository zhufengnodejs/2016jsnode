/**
 * 通过node在电脑上创建一个HTTP的服务器
 * 1 HTTP 只能接收HTTP请求
 * 2 服务器 能在特定IP特定端口上监听客户端的连接
 **/
var http = require('http');//核心模块，直接加载即可
//创建一个HTTP服务器，并在客户端连接到来的时候执行回应的回调函数
// request 代表客户端的请求，可以从中读取请求中的数据
// response 代表向客户端发的响应 可以通过它向客户端发响应
http.createServer(function(request,response){
   console.log(request.method);//请求的方法
   console.log(request.url);//请求的URL
   console.log(request.httpVersion);//HTTP版本号
   console.log(request.headers);//请求头 请求首部

   response.statusCode = 200;//指定状态码
   response.setHeader('name','zfpx');//设置响应头
   response.write('hello'); //写入响应体 write 可以调用多次
   response.write('world');
   response.end();// 结束响应 挂电话 挂掉电话就不能再write了
   //response.write('over');//write after end


}).listen(9090);//在本机的9090端口上进行监听

/**
 * 运行在服务器端，就是不发送给客户端浏览器运行的就叫服务器端代码
 * 发送给浏览器，在浏览器中运行的代码就叫客户端代码
 *
 **/