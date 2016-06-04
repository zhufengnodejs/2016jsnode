/**
 * 1.当用户浏览器访问 / 返回个空表单
 * 2. 当点击表单提交的时候，以post方式向服务器提交请求，并传递请求体
 * 3. 在服务器端接收客户端发过来的post请求数据，并且在控制台输出
 **/
var http = require('http');
var fs = require('fs');
http.createServer(function(request,response){
   if(request.url == '/reg'){//当请求的url = /reg
       var method = request.method;//获取方法名
       if(method == 'GET'){//如果方法是GET
           //读取form.html文件的内容
           fs.readFile('./form.html',function(err,data){
               //把数据写入响应体
               response.end(data);
           })
       }else if(method == 'POST'){//如果请求的方法POST

       }
   }else{
       response.end('Not Found');
   }
}).listen(9090);