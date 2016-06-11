var express = require('express');
var fs = require('fs');
var path = require('path');
/**
 * 1. 如何设置模板引擎
 * 2. 如果设置模板存放目录
 * 3. 如果渲染模板
 * 4. 如何自定义模板文件后缀
 * 5. 区分<%=%> <%-%> <%%>的区别与联系
 * 6. 弄清 res.locals和data的关系。
 */
var app = express();
// ejs -> html
app.set('view engine', 'html');//设置模板引擎=其实就是渲染模板的方法
app.set('views', path.join(__dirname, 'views'));//指定模板的存放目录
console.log(app.get('views'));
//设置对于.html后缀的模板，使用ejs的函数来进行渲染
app.engine('html',require('ejs').__express);


/**
 * =  把对象的属性把此变量进行替换，如果遇到html标签则进行转义
 * -  如果遇到html标签则不进行转义
 *  如果对象中没有某个变量的话，在模板肯定不能用，用的话会报错 username is not defined
 *
 *  data并不是真正渲染模板的对象,真正用来渲染的数据对象是res.locals
 *
 *
 */
app.use(function(req,res,next){
    /**
     * @param tmpl 模板的相对路径
     * @param data 数据对象
     * @param callabck 模板渲染完成之后回调函数
     */
 res.render2 = function(tmpl,locals,callback){
     /**
      * 1. 先得到模板的真实路径
      * 2. 读取模板的内容
      * 3. 跟数据进行混合渲染得到最终的HTML字符串
      * 4. 把此HTML字符串发送给客户端
      * 5. 调用callback
      */
     //如果有后缀，不处理，如果没后缀，加上.html后缀
     var extName = app.get('view engine');
     tmpl += tmpl.endsWith('.'+extName)?'':'.'+extName;
      //得到模板的真实路径
     var filename =  path.join(app.get('views'),tmpl);
     fs.readFile(filename,'utf8',function(err,data){
         console.log(data);
         data = data.replace(/<%=(\w+)%>/,function(input,group1){
            return locals[group1];
         });
        res.end(data);
         callback();
     });

 }
    next();
});

app.get('/', function (req,res) {
    // path 是相对路径，相对于views所在目录的相对路径
    // data 是数据，是用来替换模板里的变量的数据
    res.render2('index',{title:'index'},function(){
        console.log('render ok');
    });
});


app.get('/user', function (req,res) {
    //在render里给的对象全部属性会被拷贝到res.locals里
    //所以给res.locals赋值也可以
    //res.locals.username = 'zfpx';
    res.render2('user',{title:'zfpxtitle'});
});

app.get('/home', function (req,res) {
    res.render('home',{title:'home'});
});

app.listen(9090);