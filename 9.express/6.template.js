var express = require('express');
var path = require('path');
var app = express();
// ejs -> html
app.set('view engine', 'html');//设置模板引擎=其实就是渲染模板的方法
app.set('views', path.join(__dirname, 'views'));//指定模板的存放目录
//设置对于.html后缀的模板，使用ejs的函数来进行渲染
app.engine('html',require('ejs').__express);

app.get('/', function (req,res) {
    // path 是相对路径，相对于views所在目录的相对路径
    // data 是数据，是用来替换模板里的变量的数据
    res.render('index',{title:'<h1>index</h1>'});
});
/**
 * =  把对象的属性把此变量进行替换，如果遇到html标签则进行转义
 * -  如果遇到html标签则不进行转义
 *  如果对象中没有某个变量的话，在模板肯定不能用，用的话会报错 username is not defined
 *
 *  data并不是真正渲染模板的对象,真正用来渲染的数据对象是res.locals
 *  merge(renderOptions, res.locals);
 *
 */
app.get('/user', function (req,res) {
    //在render里给的对象全部属性会被拷贝到res.locals里
    //所以给res.locals赋值也可以
    //res.locals.username = 'zfpx';
    res.render('user',{title:'zfpxtitle'});
});

app.get('/home', function (req,res) {
    res.render('home',{title:'home'});
});

app.listen(9090);