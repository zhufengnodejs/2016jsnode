/**
 * 1. expires  指定过期时间
 * 2. cache-control 指定失效时间，就是多长时间之后过期
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
        console.log(req.url);
        //判断请求的资源是否存在
        //先得到请求的资源的真实路径
        var filename = path.resolve(root,req.path.slice(1));
        fs.exists(filename,function(exists){
            if(exists){
                var expires = new Date(Date.now()+20*1000);
                //设置缓存的失效时间
                res.setHeader('Expires',expires.toUTCString());
                //设置缓存文件的最长存活时间
                res.setHeader('Cache-Control','max-age=10');
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
