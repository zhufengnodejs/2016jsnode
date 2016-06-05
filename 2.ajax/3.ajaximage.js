var http = require('http');
var fs = require('fs');
//可以用来解析请求体里包含文件的情况，也就是说请求体的类型是multipart/form-data
var formidable = require('formidable');
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
        fs.createReadStream('./3.ajaximage.html').pipe(response);// response是一个可写流
   }else if(pathname == '/ajax'){
        var parser = new formidable.IncomingForm();
       //异步解析完成后会调用回调函数，fileds里放置普通的input,files放置文件域
       parser.parse(request,function(err,fields,files){
           /**
            * files是个对象key就是属性 avatar value=对象
            *   path 文件存储在硬盘的上的物理路径 C:\Users\Administrator\AppData\Local\Temp\upload_7f0f6fc0932e85981a8096582f27a364
            *   name 文件原来的名称 1.png
            *   type 文件原来的类型 image/png
            */
           //把文件从临时目录中读出来，写到当前目录下面  名字还用原始的名称
           fs.createReadStream(files.avatar.path).pipe(
               fs.createWriteStream('./'+files.avatar.name)
           );
           //增加一个头像自定义属性
           fields.avatar = '/'+files.avatar.name; // /2.png
           response.end(JSON.stringify(fields));
       });
   }else{
       // ./1.png 判断有无此文件 有的话读出来返回，没有返回404
       fs.exists('.'+pathname,function(exists){
           if(exists){
                fs.createReadStream('.'+pathname).pipe(response);
           }else{
               response.end('404');
           }
       })
   }
}).listen(9090);