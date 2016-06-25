var util = require('../util');
module.exports = function(app){
    app.route('/users').get(function (req, res) { //查询所有用户
        util.readUsers(res, function (users) {
            res.send(users);
        });
    }).post(function (req, res) { //新增加用户
        var user = req.body;//读取请求体中的用户对象
        util.readUsers(res, function (users) {
            user.id = users[users.length - 1].id + 1;//新生成的ID应该是原来最大的ID+1
            util.saveUser(res, users.concat(user), function () {
                res.send(user);
            });
        });
    })
}
