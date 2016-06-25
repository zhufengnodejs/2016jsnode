var util = require('../util');
module.exports = function(app){
    // /users?keyword=1&pageNum=2&pageSize=2&orderBy=id&order=asc
    app.route('/users').get(function (req, res) { //查询所有用户
        util.readUsers(res, function (users) {
            var keyword = req.query.keyword?req.query.keyword:'';
            var orderBy = req.query.orderBy?req.query.orderBy:'id';
            var order = req.query.order?req.query.order:'asc';
            var query = new RegExp(keyword);// /a/
            var pageNum = req.query.pageNum?Number(req.query.pageNum):1;
            var pageSize = req.query.pageSize?Number(req.query.pageSize):2;
            users = users.filter(item=>query.test(item.name)).sort((a,b)=>{
                var asc = order == 'desc'?-1:1;
                return (a[orderBy] - b[orderBy])*asc;
            }).slice((pageNum-1)*pageSize,pageNum*pageSize);
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
