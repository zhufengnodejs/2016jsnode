/*var chinese = '女神经.jpg';
var encode = encodeURIComponent(chinese);
console.log(encode);
var decode = decodeURIComponent(encode);
console.log(decode);*/
//%E5%A5%B3%E7%A5%9E%E7%BB%8F.jpg
//%E5%A5%B3%E7%A5%9E%E7%BB%8F.jpg
console.log(new Buffer('女'));
console.log(14*16+5);// 229
/**
 * 1. 因为我们的URL中不支持中文，只能放单字节的 ascii码的字符
 *
 **/