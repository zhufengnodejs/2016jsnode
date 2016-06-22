/**
 * 1. 第一次客户端访问服务器的时候，服务不但会响应对应的文件，还会告诉 客户端这个文件的etag，客户端收到后会记录etag。
 * 2. 第二次客户端访问服务器的时候，会向服务器访问此文件是否修改过，如果改过，返回最新的文件，如果没改过返回304
 */
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
//app.use(express.static(__dirname));
//编写一个静态文件服务中间件
// http://localhost:9090/index.html
/**
 * 1. 不能从输出反推出输入
 * 2. 相同的输入一定会得到相同的输出
 * 3. 不同的输入一定会产生不同的输出
 * 4. 不管输入的多长，得到的长度都是一样的。
 * @param filename
 */
var crypto =  require('crypto');
//异步函数的返回值通过callback来接收，当异步任务完成的时候会调用callback
function getHash(filename,callback){
    fs.readFile(filename,function(err,content){
        callback(err,crypto.createHash('md5').update(content).digest('hex'));
    });
}
function static(root){
    return function(req,res,next){
        //判断请求的资源是否存在
        //先得到请求的资源的真实路径
        var filename = path.resolve(root,req.path.slice(1));
        fs.exists(filename,function(exists){
            if(exists){
                //获取缓存的etag
                var ifNoneMatch = req.headers['if-none-match'];
                //获取此文件对应md5哈希值
                getHash(filename,function(err,hash){
                    if(hash == ifNoneMatch){ //如果一致表示未被修改过
                        res.statusCode = 304;
                        res.send('Not Modified');
                    }else{
                        res.setHeader('Etag',hash);
                        fs.createReadStream(filename).pipe(res);
                    }
                });

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
