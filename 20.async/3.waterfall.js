var async = require('async');
//多个任务依次执行
console.time('cost');
/**
 * 1. 手机-微信号->头像
 */
var WeChat ={
    '15718856132':'zhangrenyang2000'
}
var Avatar ={
    'zhangrenyang2000':'https://img/logo.png'
}
async.waterfall([
   function(callback){
       setTimeout(function(){
           callback(null,'15718856132');
       },1000);
   },
    function(cellphone,callback){
        setTimeout(function(){
            callback(null,WeChat[cellphone]);
        },1000);
    },
    function(weChat,callback){
        setTimeout(function(){
            callback(null,Avatar[weChat]);
        },1000);
    }
],function(err,result){
    console.log(result);
    console.timeEnd('cost');
})