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
            res.send(user);
        });
    });
})

//获取单个用户信息
app.route('/users/:id').get(function(req,res){
    readUsers(res, function (users) {
        var user = users.filter(item=>item.id == req.params.id)[0];
        res.send(user?user:'{}');
    });
}).put((req,res)=>{ //更新用户，传入完整的用户对象替换原来的用户
    var user = req.body;
    readUsers(res, function (users) {
        users = users.map(item => {
            if(item.id == req.params.id){//如果当前用户跟URL中指定的用户ID相同的话则替换成新的用户，如果不相同则保持原数组不变
                return user;
            }else{
                return item;
            }
        })
        saveUser(res, users, function () {
            res.send(user);
        });
    });

})

app.listen(9090);