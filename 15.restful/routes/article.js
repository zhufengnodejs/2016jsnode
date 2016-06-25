module.exports = function(app){
    app.route('/articles').get(function(req,res){
        res.send('articles');
    })
}