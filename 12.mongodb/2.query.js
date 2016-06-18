var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/201602js');
var PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    phone: {type: String},
    email: {type: String},
    home: {type: String},
    birthday: {type: Date, default: Date.now()}
});

var personModel = mongoose.model('person', PersonSchema);
/**
 * err 错误对象
 * docs 所有符合条件的文档组成的数组
 */
/*personModel.find({age:18},function(err,docs){
 if(err){
 console.error(err);
 }else{
 console.log(docs);
 }
 });*/
//create和save 方法一样，用于把一个对象保存到数据库中
// create model的方法
// save entity的方法
/*personModel.create({
 name:'zfpx2',
 age:8
 },function(err,result){
 if(err){
 console.error(err);
 }else{
 console.log(result);
 }
 });*/
/*
 personModel.update({name:'zfpx2'},//更新的范围和符合
 {$set:{phone:'15718856132'}},//更新的内容 $set表示覆盖或追加属性
 function(err,doc){
 if(err){
 console.error(err);//错误对象
 }else{
 console.log(doc);//更新之后的对象
 }
 });*/
//1. 删除的范围，也就删除的条件
/**
 * 回调第二个参数
 *  save create 参数就是保存之后新的文档对象
 *  update remove 参数就是操作的结果
 */
/*
 personModel.remove({name:'张三'},function(err,data){
 if(err){
 console.error(err);//错误对象
 }else{
 console.log(data.result);//更新之后的对象
 }
 });*/
/*
personModel.create([
    {name: 'zfpx1', age: 1},
    {name: 'zfpx2', age: 2},
    {name: 'zfpx3', age: 3},
    {name: 'zfpx4', age: 4},
    {name: 'zfpx5', age: 5},
    {name: 'zfpx6', age: 6},
    {name: 'zfpx7', age: 7},
    {name: 'zfpx8', age: 8},
    {name: 'zfpx9', age: 9},
    {name: 'zfpx10', age: 10},
], function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});*/

/*personModel.findOne({age:{$gt:5}},function(err,result){
    console.log(result);
});*/
//根据ID进行查询文档
personModel.findById("5764c336db58a5dc1aadc2df",function(err,result){
    console.log(result);
});

//每页4条，查询第二页的数据
/**
 * 1. 表示查询的条件
 * 2. 返回字段 如果返回则为1，如果不返回则为0,如果传null 表示返回所有字段
 * 3. 配置对象
 */
personModel.find({},null,{
    sort:{age:-1},//按age字段倒序排序
    skip:4,
    limit:4
},function(err,result){
    console.log(result);
});

personModel.count({age:{$gt:5}},function(err,count){
    console.log(count);
})