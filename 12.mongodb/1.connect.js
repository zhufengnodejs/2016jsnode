var mongoose = require('mongoose');//引入数据库操作模块
//var db = mongoose.connect('mongodb://123.57.143.189:27017/201602js');//连接数据库
//var db = mongoose.connect('mongodb://localhost/201602js');/

mongoose.connect('mongodb://localhost/201602js');
/*db.connection.on('error',function(err){//连接失败触发error事件并执行回调
    console.error(err);
});*/

/*db.connection.on('open',function(){//连接成功触发open事件并执行回调
    console.log('数据库连接成功');
});*/
//定义schema 就是规定了集合中的文档拥有哪些字段，以及字些字段的类型是什么，默认值是什么
var PersonSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    email:{type:String},
    birthday:{type:Date,default:Date.now()}
});

//定义一个模型 指定集合的名称和shema
var personModel = mongoose.model('person',PersonSchema);

var personEntity = new personModel({
    name:'张三',
    age:55,
    email:'zhang_renyang@126.com',
    home:'北京'
});

personEntity.save(function(err){
    console.log(err);
});
