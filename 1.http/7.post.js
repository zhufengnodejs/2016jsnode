/**
 * 1.当用户浏览器访问 / 返回个空表单
 * 2. 当点击表单提交的时候，以post方式向服务器提交请求，并传递请求体
 * 3. 在服务器端接收客户端发过来的post请求数据，并且在控制台输出
 **/
var http = require('http');
var fs = require('fs');
/**
 *  curl -X "POST" -d "name=zfpx" -H "my:yours" http://localhost:9090/reg

 *  -X 指定请求的方法名
 *  -d 指定 请求体数据
 *  -H 指定请求头
 */
http.createServer(function(request,response){
    console.log(request.url,request.method);
    console.log(request.headers);
   if(request.url == '/reg'){//当请求的url = /reg
       var method = request.method;//获取方法名
       if(method == 'GET'){//如果方法是GET
           //读取form.html文件的内容
           fs.readFile('./form.html',function(err,data){
               //把数据写入响应体
               response.end(data);
           })
       }else if(method == 'POST'){//如果请求的方法POST
        //客户端在表单中已经输入了内容，并且以POST的方式提交到了服务器端，并把表单的数据进行序列化放在请求体里。然后在服务器端可以通过流的方式读取
           var result = '';
           request.setEncoding('utf8');//设置请求流中的编码
           //因为服务器可能会多次提交客户端的数据，会触发多次data事件
           request.on('data',function(data){
               //如果设置了编码，那data就是字符串，如果不设置编码，data是Buffer
               result+= data;
           });
           //最后当所有的数据都接收完毕之后会触发end事件
           request.on('end',function(){
               //如果以post方式提交表单，会把表单keyvalue转成查询字符串放在请求体里
              console.log(result);
               response.end(result);
           });
       }
   }else{
       response.end('Not Found');
   }
}).listen(9090);