var child_process = require('child_process');
/**
 * 1. 可执行文件的路径
 * 2. 是一个数组 表示传递给此可执行文件路径的参数
 */
var child = child_process.spawn(process.execPath,['child.js',1,3,4]);
child.stdout.pipe(process.stdout);

//node child.js 1 3 4
/*var child = child_process.exec('node child.js 1 3 3 4',function(err,stdout,stderr){
    console.log(stdout);
});*/
/**
 * 1. 参数的传递方法不一样
 * 2. spawn是以流的方式把子进程的输出传送到主进程的输出中
 * 3. exec是当子进行完全结束退出之后，把输出传送到主进程的输出中
 */
