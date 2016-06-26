var async = require('async');
//多个任务依次执行
console.time('cost');

async.auto({
    water:function(callback){
        callback(null,'water');
    },
    flour:function(callback){
        callback(null,'flour');
    },
    mix:['water','flour',function(result,callback){
        callback(null,result.water+'+'+result.flour+'+mix');
    }],
    steam:['mix',function(result,callback){
        callback(null,result.mix+'+steam');
    }]
},function(err,result){
    console.log(result);
    console.timeEnd('cost');
})