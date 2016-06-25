var express = require('express');
var path = require('path');
var app = express();
app.get('/',function(req,res){
    //把html返回客户端
   res.sendFile(path.resolve('./chat.html'));
   //res.sendFile(path.join(__dirname,'index.html'));
});
/*app.get('/io.js',function(req,res){
 res.sendFile(path.resolve('../node_modules/socket.io-client/socket.io.js'));
});*/
var http = require('http');
var server = http.createServer(app);
//socket.io需要借助http服务器
//因为socketio建立连接的时候需要使用http协议
var io = require('socket.io')(server);
//默认的命名空间
io.on('connection',function(socket){
    var currentRoom;
  console.log('chat客户端已经连接');
  socket.on('message',function(msg){
    console.log('chat服务器收到客户端的消息:',msg);
    socket.send(msg);//把消息发送给对方一个人听
  });
    //加入某个房间
  socket.on('join',function(roomname){
     socket.join(roomname);
     currentRoom = roomname;//暂存房间名
  });
    socket.on('leave',function(roomname){
        socket.leave(roomname);
        currentRoom = undefined;//暂存房间名
    });
    //监听广播
    socket.on('broadcast',function(msg){
        console.log('broadcast',msg,currentRoom)
        //广播给所有人听
        if(currentRoom){
            //socket.broadcast.to(currentRoom).emit('message',msg);
            io.in(currentRoom).emit('message',msg);
        }
        else{
            //socket.broadcast.emit('message',msg);
            io.emit('message',msg);
        }

    });
});

server.listen(9090);



