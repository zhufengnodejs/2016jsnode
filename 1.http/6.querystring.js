var querystring = require('querystring');
var str = 'name==zfpx@age==8';
//手工指定字段分隔符和 keyvalue分隔符
var query = querystring.parse(str,'@','==');//字符串转成对象
console.log(query);
console.log(querystring.stringify(query,'@','=='));//把对象转成字符串