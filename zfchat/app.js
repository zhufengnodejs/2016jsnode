var express = require('express')
var async = require('async');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));
var Controllers = require('./controllers')
var mongoose = require('mongoose')
var ObjectId = require('mongoose').Schema.ObjectId;
var cookieParser = require('cookie-parser');
var signedCookieParser = cookieParser('zfchat')
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
var sessionStore = new MongoStore({
    db:settings.db,
    host:settings.host,
    port:settings.port
});
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfchat',
    store:sessionStore
}));// req.session
app.get('/api/validate', function (req, res) {
    var _userId = req.session._userId;
    if (_userId) {
        Controllers.User.findUserById(_userId, function (err, user) {
            if (err) {
                res.status(401).json({msg: err});
            } else {
                res.json(user);
            }
        })
    } else {
        res.status(401).json(null);
    }
})
app.post('/api/login', function(req, res) {
    var email = req.body.email;
    if (email) {
        Controllers.User.findByEmailOrCreate(email, function(err, user) {
            if (err) {
                res.json(500, {
                    msg: err
                })
            } else {
                req.session._userId = user._id
                Controllers.User.online(user._id, function (err, user) {
                    if (err) {
                        res.json(500, {
                            msg: err
                        })
                    } else {
                        res.json(user)
                    }
                })
            }
        })
    } else {
        res.josn(403)
    }
})

app.get('/api/logout', function(req, res) {
    var _userId = req.session._userId
    Controllers.User.offline(_userId, function (err, user) {
        if (err) {
            res.json(500, {
                msg: err
            })
        } else {
            res.json(200)
            delete req.session._userId
        }
    })
})
app.use(function (req, res) {
    res.sendFile(__dirname+'/build/index.html');
})


var io = require('socket.io').listen(app.listen(port));
io.set('authorization', function(request, next) {
    signedCookieParser(request,{},function(err){//解密cookie
        sessionStore.get(request.signedCookies['connect.sid'],function(err,session){//从session中获取会话信息
            if (err) {
                next(err.message, false)
            } else {
                if (session && session._userId) {
                    request.session = session;
                    next(null, true)
                } else {
                    next('No login')
                }
            }
        });
    });
});

var SYSTEM = {
    name: '江湖',
    avatarUrl: 'https://secure.gravatar.com/avatar/50d11d6a57cfd40e0878c8ac307f3e01?s=48'
}

io.sockets.on('connection', function(socket) {
    var _userId = socket.request.session._userId
    Controllers.User.online(_userId, function(err, user) {
        if (err) {
            socket.emit('err', {
                mesg: err
            })
        } else {
            if (user._roomId) {
                socket.join(user._roomId);
                socket.in(user._roomId).broadcast.emit('users.join', user)
                socket.in(user._roomId).broadcast.emit('messages.add', {
                    content: user.name + '进入了聊天室',
                    creator: SYSTEM,
                    createAt: new Date(),
                    _id: ObjectId()
                })
            }

        }
    })
    socket.on('disconnect', function() {
        Controllers.User.offline(_userId, function(err, user) {
            if (err) {
                socket.emit('err', {
                    mesg: err
                })
            } else {
                if (user._roomId) {
                    socket.in(user._roomId).broadcast.emit('users.leave', user)
                    socket.in(user._roomId).broadcast.emit('messages.add', {
                        content: user.name + '离开了聊天室',
                        creator: SYSTEM,
                        createAt: new Date(),
                        _id: ObjectId()
                    })
                    Controllers.User.leaveRoom({
                        user: user
                    }, function() {})
                }

            }
        })
    })

    socket.on('getRoom', function() {
        async.parallel([
                function(done) {
                    Controllers.User.getOnlineUsers(done)
                },
                function(done) {
                    Controllers.Message.read(done)
                }
            ],
            function(err, results) {
                if (err) {
                    socket.emit('err', {
                        msg: err
                    })
                } else {
                    socket.emit('roomData', {
                        users: results[0],
                        messages: results[1]
                    })
                }
            });
    })
    socket.on('messages.create', function(message) {
        Controllers.Message.create(message,function (err, message) {
            if (err) {
                socket.emit('err', {msg: err})
            } else {
                io.sockets.emit('messages.add', message)
            }
        })
    })

    socket.on('createRoom', function(room) {
        Controllers.Room.create(room, function(err, room) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                room = room.toObject()
                room.users = []
                io.sockets.emit('rooms.add', room)
            }
        })
    })

    socket.on('getAllRooms', function(data) {
        if (data && data._roomId) {
            Controllers.Room.getById(data._roomId, function(err, room) {
                if (err) {
                    socket.emit('err', {
                        msg: err
                    })
                } else {
                    socket.emit('roomData.' + data._roomId, room)
                }
            })
        } else {
            Controllers.Room.read(function(err, rooms) {
                if (err) {
                    socket.emit('err', {
                        msg: err
                    })
                } else {
                    socket.emit('roomsData', rooms)
                }
            })
        }
    })

    socket.on('joinRoom', function(join) {
        Controllers.User.joinRoom(join, function(err) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                socket.join(join.room._id);
                socket.emit('joinRoom.' + join.user._id, join);
                socket.in(join.room._id).broadcast.emit('messageAdded', {
                    content: join.user.name + '进入了聊天室',
                    creator: SYSTEM,
                    createAt: new Date(),
                    _id: ObjectId()
                })
                socket.in(join.room._id).broadcast.emit('joinRoom', join);
            }
        })
    })

    socket.on('createMessage', function(message) {
        Controllers.Message.create(message, function(err, message) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                socket.in(message._roomId).broadcast.emit('messageAdded', message)
                socket.emit('messageAdded', message)
            }
        })
    })

    socket.on('leaveRoom', function(leave) {
        Controllers.User.leaveRoom(leave, function(err) {
            if (err) {
                socket.emit('err', {
                    msg: err
                })
            } else {
                socket.in(leave.room._id).broadcast.emit('messageAdded', {
                    content: leave.user.name + '离开了聊天室',
                    creator: SYSTEM,
                    createAt: new Date(),
                    _id: ObjectId()
                })
                socket.leave(leave.room._id)
                io.sockets.emit('leaveRoom', leave)
            }
        })
    })
})
console.log('TechNode is on port ' + port + '!')