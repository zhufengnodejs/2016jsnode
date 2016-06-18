var mongoose = require('mongoose');//引入数据库操作模块
//var db = mongoose.connect('mongodb://123.57.143.189:27017/201602js');//连接数据库
var db = mongoose.connect('mongodb://localhost/201602js');//连接数据库
db.connection.on('error',function(err){//连接失败触发error事件并执行回调
    console.error(err);
});
db.connection.on('open',function(){//连接成功触发open事件并执行回调
    console.log('数据库连接成功');
});