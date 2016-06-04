var querystring = require('querystring');
var str = 'name==zfpx@age==8';
var query = querystring.parse(str,'@','==');//字符串转成对象
console.log(query);
console.log(querystring.stringify(query,'@','=='));//把对象转成字符串