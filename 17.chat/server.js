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
var rooms ={

};
io.on('connection',function(socket){
    socket.on('addMessage',function(msgObj){
        var roomId = msgObj.roomId;
        var message = msgObj.message;
        rooms[roomId].messages.push(message);
        io.emit('messageAdded',message);
    });
    socket.on('getAllRooms',function(){
        var arr = Object.keys(rooms).map(key=>{
            return {id:key,name:rooms[key].name};
        })
        socket.emit('allRooms',arr);
    });
    socket.on('createRoom',function(roomName){
        var id = Date.now()+'';
        //创建新房间 id 是房间的ID value是房间名房间内的消息
        rooms[id] = {
            name:roomName,
            messages:[]
        }
        io.emit('roomCreated',{id:id,name:roomName});
    });

    socket.on('getAllMessages',function(id){
        var messages = rooms[id].messages;
        socket.emit('allMessages',messages);
    });
});

server.listen(9090);