var util = require('../util');
module.exports = function(app){
    //获取单个用户信息
    app.route('/users/:id').get(function(req,res){
        util.readUsers(res, function (users) {
            var user = users.filter(item=>item.id == req.params.id)[0];
            res.send(user?user:'{}');
        });
    }).put((req,res)=>{ //更新用户，传入完整的用户对象替换原来的用户
        var user = req.body;
        util.readUsers(res, function (users) {
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
    }).patch((req,res)=>{ //局部更新
        var user = req.body;
        util.readUsers(res, function (users) {
            users = users.map(item => {
                if(item.id == req.params.id){//如果当前用户跟URL中指定的用户ID相同的话则替换成新的用户，如果不相同则保持原数组不变
                    Object.assign(item,user);
                }
                return item;
            })
            util.saveUser(res, users, function () {
                res.send(user);
            });
        });
    }).delete((req,res)=>{
        util.readUsers(res, function (users) {
            for(var i=0;i<users.length;i++){
                if(users[i].id == req.params.id){
                    users.splice(i,1);
                    break;
                }
            }
            util.saveUser(res, users, function () {
                res.send({});//删除之后返回空对象
            });
        });

    })
}
