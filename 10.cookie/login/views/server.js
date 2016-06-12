var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.set('view engine','html');
app.set('views',__dirname);
//当遇到以.html结尾的模板的时候调用ejs提供的渲染方法进行渲染
app.engine('html',require('ejs').__express);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,//是否重新保存
    saveUninitialized:true,//是否保存未初始化的session
    secret:'zfpx'//提供加密cookie的密钥
}));
app.use(function(req,res,next){
    //渲染模板实际上用的是 res.locals
    res.locals.username = req.session.username;
    next();
});
app.get('/',function(req,res){
    res.render('index',{});
});

app.get('/login',function(req,res){
    res.render('login',{});
})

app.post('/login',function(req,res){
    //得到请求体对象
    var user = req.body;
    //把用户名放到session中
    req.session.username = user.username;
    //让客户端重新请求/user路径
    //res.render('user',{username:user.username});

    res.redirect('/user');
});

app.get('/user',function(req,res){
    res.render('user',{});
});
app.listen(9090);