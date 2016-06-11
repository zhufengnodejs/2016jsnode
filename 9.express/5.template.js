var express = require('express');
var path = require('path');
var app = express();
app.set('view engine', 'ejs');//设置模板引擎=其实就是渲染模板的方法
app.set('views', path.join(__dirname, 'views'));//指定模板的存放目录
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
 */
app.get('/user', function (req,res) {
    res.render('user',{title:'user',user:{username:'zfpx'}});
});

app.get('/home', function (req,res) {
    res.render('home',{title:'home'});
});

app.listen(9090);