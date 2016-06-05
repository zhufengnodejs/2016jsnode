var http = require('http');

//以异步的方式向服务器发起请求
var req = http.request({
  hostname:'www.baidu.com',
  port:80,
  method:'GET',
  path:'/',
  headers:{}//请求头暂时留空
},function(response){
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

req.end();//当调用end方法的时候，请求才会真正发出