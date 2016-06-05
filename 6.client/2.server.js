var http = require('http');
var url = require('url');
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/post'){
        var str = '';
        req.setEncoding('utf8');
        req.on('data',function(data){
            str+= data;
        });
        req.on('end',function(data){
            res.end(str);//把str写回了客户端
        });
    }else{
        res.end('404');
    }
}).listen(9090,'localhost');