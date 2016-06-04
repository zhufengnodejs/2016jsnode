/**
 * 通过node在电脑上创建一个HTTP的服务器
 * 1 HTTP 只能接收HTTP请求
 * 2 服务器 能在特定IP特定端口上监听客户端的连接
 **/
var fs = require('fs');
var mime = require('mime');
var http = require('http');//核心模块，直接加载即可
//创建一个HTTP服务器，并在客户端连接到来的时候执行回应的回调函数
// request 代表客户端的请求，可以从中读取请求中的数据
// response 代表向客户端发的响应 可以通过它向客户端发响应
/**
 * 不要重复自己 Don't repeat yourself
 * 1. 代码量会很多
 * 2. 如果要修改重构的话修改的地方很多
 * 3. 时间多，容易出错
 */
/**
 * 全局安装 一次安装，到处在CMD使用，
 * 本地安装 一次安装，只能在当前目录下面用，在代码中通过 require加载使用
 */
http.createServer(function(request,response){

    //先判断文件是否存在，如果存在读出来返回给客户端
  fs.exists('.'+request.url,function(exists){
      if(exists){
          //增加响应头，告诉浏览器响应的类型是什么
          response.setHeader('Content-Type',mime.lookup(request.url));
          //读取文件并且返回写给响应
          fs.readFile('.'+request.url,function(err,data){
              response.end(data);
          })
      }else{
          response.setHeader('Content-Type','text/html;charset=utf-8');
        response.statusCode = 404;//设置响应码为404 Not Found
        response.end('你要的资源不存在');//设置响应体
      }
  })


//listen EADDRINUSE 端口号被占用
}).listen(9090);//在本机的9090端口上进行监听

/**
 * 运行在服务器端，就是不发送给客户端浏览器运行的就叫服务器端代码
 * 发送给浏览器，在浏览器中运行的代码就叫客户端代码
 *
 **/