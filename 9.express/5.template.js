var express = require('express');
var path = require('path');
var app = express();
app.set('view engine', 'ejs');//设置模板引擎=其实就是渲染模板的方法
app.set('views', path.join(__dirname, 'views'));//指定模板的存放目录
app.get('/', function (req,res) {
    // path 是相对路径，相对于views所在目录的相对路径
    // data 是数据，是用来替换模板里的变量的数据
    res.render('index',{title:'index'});
});

app.get('/user', function (req,res) {
    res.render('user',{title:'user'});
});

app.get('/home', function (req,res) {
    res.render('home',{title:'home'});
});

app.listen(9090);