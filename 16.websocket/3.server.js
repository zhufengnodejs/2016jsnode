var Server = require('ws').Server;
var server = new Server({
    port:9090
});
//监听客户端的请求 当客户端连接上来的时候调用回调函数
server.on('connection',function(ws){
    console.log('客户端已经连接')
  //监听message事件
  ws.on('message',function(msg){
    console.log(msg);
    ws.send("服务器回应:"+msg);
    setInterval(function(){
        ws.send("你好不?");
    },3000)
  });
});