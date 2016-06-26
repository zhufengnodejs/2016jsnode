var CronJob = require('cron').CronJob;
/**
 * *   *    *  *  *  *
 * 秒 分钟 小时 日  月  星期
 * * 代表任意的值
 * 星/10 代表每隔10秒执行一次
 * 1,3,5,7 逗号代表枚举值
 * 1-5 代表一个区间 从第1秒到第5秒执行
 */
var now = Date.now();
var job = new CronJob('30-35 * * 1 * *',function(){
    console.log(Math.floor((Date.now()-now)/1000),'exec');
});
job.start();