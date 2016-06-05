var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring=require('querystring');
http.createServer(function(request,response){
    var urlObj=url.parse(request.url,true);
    var pathname=urlObj.pathname,query=urlObj.query;
    if(pathname=='/visit'){
        //如果请求头中没有cookie的话
        if(!request.headers.cookie){
            //设置默认值 1 通过响应头Set-Cookie种植到客户端
            response.setHeader('Set-Cookie',['visit=1','name=zfpx']);
            response.end("1");
            return;
        }
      /*  var reg=/visit=(\d+)/;//正则匹配
        //从cookie中提供出来原来的数字并且加1
        var num=reg.exec(request.headers.cookie)[1];
        num=parseFloat(num)+1;*/
        // visit=1; name=zfpx
        var cookieObj = querystring.parse(request.headers.cookie,'; ');
        var num = parseInt(cookieObj.visit)+1;
        response.setHeader('Set-Cookie','visit='+num);
        response.end(""+num);
    }else {
        response.end('404');
    }
}).listen(3333);
