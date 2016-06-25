var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
    res.sendFile(path.resolve('./index.html'));
});
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection',function(socket){
    console.log('客户端已经连接');
    socket.on('message',function(msg){
        console.log(msg);
        io.emit('message',msg);
    });
});

server.listen(9090);