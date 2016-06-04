// 一个UTF8汉字是由三个字节组成的
// console.log(new Buffer('中文'));
// %E4%B8%AD%E6%96%87

console.log(encodeURIComponent('中文'));
//%E4%B8%AD%E6%96%87