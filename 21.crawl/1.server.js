var app = require('express')();
app.get('/',function(req,res){
    res.send('hello');
});
app.listen(9090);