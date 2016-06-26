var cheerio = require('cheerio');
var $ = cheerio.load('<h2 class="red">hello</h2>');
//如何进行操作DOM元素
$('h2.red').addClass('blue');
$('h2.red').append('<span name="zfpx">span</span>');
var ele = $('h2').find('span');
console.log($.html());
console.log(ele.attr('name'));