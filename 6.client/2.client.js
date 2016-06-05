var http = require('http');

//以异步的方式向服务器发起请求
var req = http.request({
  hostname:'localhost',
  port:9090,
  method:'POST',
  path:'/post',
  headers:{'Content-Type':'text/plain'}//请求体类型为纯文本
},function(response){
    console.log(response.statusCode);
    //console.log(response.headers);//请头
  var str = '';
  response.setEncoding('utf8');
  response.on('data',function(data){
      //console.log(data);
      str+= data;
  });
  response.on('end',function(data){
       console.log(str);
  });
})
req.write('xxx');//写请求体
req.end();//当调用end方法的时候，请求才会真正发出