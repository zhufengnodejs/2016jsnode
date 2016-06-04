var url = require('url');
var str = 'http://zhufengnodejs:123@github.com:80/2016jsnode?name=zfpx&age=8#top';
var urlObj = url.parse(str); //用于将字符串转成对象
console.log(urlObj);
console.log(url.format(urlObj));//用于将对象转成字符串
/**
 protocol: 'http:', 协议
 slashes: true, 是否有//
 auth: 'zhufengnodejs:123', 用户名和密码
 host: 'github.com:80', 主机
 port: '80', 端口
 hostname: 'github.com',域名
 hash: '#top', 片断标识符 指向HTML页面某个DOM元素的ID
 search: '?name=zfpx&age=8', ?+查询字符串
 query: 'name=zfpx&age=8',查询字符串
 pathname: '/2016jsnode', 端口号和？中间的那部分
 path: '/2016jsnode?name=zfpx&age=8', pathname+search
 href: 'http://zhufengnodejs:123@github.com:80/2016jsnode?name=zfpx&age=8#top' 原始的URL
 **/