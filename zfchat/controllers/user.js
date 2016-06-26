var db = require('../models')
var async = require('async');
var crypto = require('crypto');

exports.findUserById = function (_userId, callback) {
    db.User.findOne({
        _id: _userId
    }, callback)
}

exports.findByEmailOrCreate = function (email, callback) {
    db.User.findOne({
        email: email
    }, function (err, user) {
        if (user) {
            callback(null, user)
        } else {
            user = new db.User
            user.name = email.split('@')[0]
            user.email = email
            user.avatarUrl = gravatar(email);
            console.log(user.avatarUrl);
            user.save(callback)
        }
    })
}
function gravatar(email){
    var md5 = crypto.createHash('md5'),
        emailMd5 = md5.update(email.toLowerCase()).digest('hex'),
        avatar = "https://secure.gravatar.com/avatar/"+emailMd5+"?s=48";
    return avatar;
}
exports.online = function(_userId, callback) {
    console.log('online',_userId);
    db.User.findOneAndUpdate({
        _id: _userId
    }, {
        $set: {
            online: true
        }
    }, callback)
}
exports.offline = function(_userId, callback) {
    db.User.findOneAndUpdate({
        _id: _userId
    }, {
        $set: {
            online: false
        }
    }, callback)
}

exports.getOnlineUsers = function(callback) {
    db.User.find({
        online: true
    }, callback)
}

exports.joinRoom = function (join, callback) {
    console.log(join);
    db.User.findOneAndUpdate({
        _id: join.user._id
    }, {
        $set: {
            online: true,
            _roomId: join.room._id
        }
    }, callback)
}

exports.leaveRoom = function (leave, callback) {
    db.User.findOneAndUpdate({
        _id: leave.user._id
    }, {
        $set: {
            online: true,
            _roomId: null
        }
    }, callback)
}