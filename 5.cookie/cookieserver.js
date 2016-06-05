var http = require('http');
var url = require('url');
/**
 * 1. 如果客人第一次来要写cookie
 * 2. 如果客户再来，会把 cookie放在请求头的Cookie字段中发回服务器端
 */
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/write'){//写cookie
        //写cookie是通过Set-Cookie的响应头来实现
        res.setHeader('Set-Cookie','visit=1');
        res.end('');
    }else if(pathname == '/read'){//读cookie
        console.log(req.headers.cookie);
        res.end(req.headers.cookie);
    }else{
        res.end('404');
    }
}).listen(9090,'localhost');