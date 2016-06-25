var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.get('/clock',function(req,res){
    setTimeout(function(){
        res.send(new Date().toLocaleString());
    },5000);
});
app.listen(9090);