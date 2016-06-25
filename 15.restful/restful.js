var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
function readUsers(res, callback) {
    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) {
            res.statusCode = 500;
            res.send('Server Error');
        } else {
            var users = JSON.parse(data);//转成JSON数组
            callback(users);
        }
    })
}

function saveUser(res, users, callback) {
    fs.writeFile('./users.json',JSON.stringify(users), function (err, result) {
        if (err) {
            res.statusCode = 500;
            res.send('Server Error');
        } else {
            callback();
        }
    })
}
app.route('/users').get(function (req, res) { //查询所有用户
    readUsers(res, function (users) {
        res.send(users);
    });
}).post(function (req, res) { //新增加用户
    var user = req.body;//读取请求体中的用户对象
    readUsers(res, function (users) {
        user.id = users[users.length - 1].id + 1;//新生成的ID应该是原来最大的ID+1
        saveUser(res, users.concat(user), function () {
            res.send(JSON.stringify(user));
        });
    });
})

app.listen(9090);