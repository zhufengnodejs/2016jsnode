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
                // stat  统计信息 statistical
                // mtime=上次修改时间  ctime=上次更改时间
                fs.stat(filename,function(err,stat){
                    var ifModifySince = req.headers['if-modified-since'];
                    if(ifModifySince){
                        //如果此文件的最后修改时间和缓存中的文件最后修改时间少于1秒，则表示此文件是最新的
                        if(stat.ctime.getTime() - new Date(ifModifySince).getTime() <1000){
                            res.statusCode = 304;
                            res.send('Not Modified');
                        }else{
                            //设置内容的上次变更时间
                            res.setHeader('Last-Modified',stat.ctime.toGMTString());
                            res.statusCode = 200;
                            fs.createReadStream(filename).pipe(res);
                        }
                    }else{
                        //设置内容的上次变更时间
                        res.setHeader('Last-Modified',stat.ctime.toGMTString());
                        res.statusCode = 200;
                        fs.createReadStream(filename).pipe(res);
                    }
                })

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
