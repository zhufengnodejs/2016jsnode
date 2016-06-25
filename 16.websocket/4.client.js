var WebSocket = require('ws');
var socket = new WebSocket('ws://localhost:9090/');
//当客户端与服务器成功建立连接之后执行回调
socket.on('open',function(){
    console.log('连接已经建立');
    socket.send('服务器你好');//客户端向服务器发消息
})
//当客户端收到服务器发的消息的时候执行回调函数
socket.on('message',function(msg){
    console.log(msg);
});