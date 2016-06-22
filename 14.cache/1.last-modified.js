/**
 * 1. 第一次客户端访问服务器的时候，服务不但会响应对应的文件，还会告诉 客户端这个文件的上次修改时间是什么，客户端收到后会记录此缓存和最后修改时间。
 * 2. 第二次客户端访问服务器的时候，会向服务器访问此文件从上次修改时间之后是否修改过，如果改过，返回最新的文件，如果没改过返回304
 */
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
//app.use(express.static(__dirname));
//编写一个静态文件服务中间件
// http://localhost:9090/index.html
function static(root){
    return function(req,res,next){
        //判断请求的资源是否存在
        //先得到请求的资源的真实路径
        var filename = path.resolve(root,req.path.slice(1));
        fs.exists(filename,function(exists){
            if(exists){
                fs.createReadStream(filename).pipe(res);
            }else{
                next();
            }
        })
    }
}
app.use(static(__dirname));
app.get('*',function(req,res){
    res.end('Not Found');
});

app.listen(9090);
