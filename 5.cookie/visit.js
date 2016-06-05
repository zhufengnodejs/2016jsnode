var http = require('http');
var url = require('url');
/**
 * 1.访问/visit接口，返回此客户端访问服务器的次数
 *
 */
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/visit'){//写cookie
        res.end('你是第次访问服务器');
    }else{
        res.end('404');
    }
}).listen(9090,'localhost');