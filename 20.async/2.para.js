var async = require('async');
//多个任务依次执行
console.time('cost');
async.parallel([
    callback => setTimeout(callback,1000,null,'one'),
    callback => setTimeout(callback,2000,null,'two'),
    callback => setTimeout(callback,1000,null,'three')
],function(err,result){
    console.log(result);
    console.timeEnd('cost');
})