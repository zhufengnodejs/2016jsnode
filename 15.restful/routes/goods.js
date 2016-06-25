module.exports = function(app){
    app.route('/goods').get(function(req,res){
        res.send('goods');
    })
}