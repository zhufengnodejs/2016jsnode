var request = require('request');
var http = require('http');
/*http.request({
    host:'localhost',
    port:9090,
    path:'/'
},function(res){
    console.log(res);
})*/
request('http://top.baidu.com/category?c=10&fr=topindex', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }else{
        console.error(error);
    }
})