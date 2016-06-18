var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/201602js');
var PersonSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    phone:{type:String},
    email:{type:String},
    home:{type:String},
    birthday:{type:Date,default:Date.now()}
});

var personModel = mongoose.model('person',PersonSchema);
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
