var fs = require('fs');
exports.readUsers =function(res, callback) {
    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) {
            res.statusCode = 500;
            res.send('Server Error');
        } else {
            var users = JSON.parse(data);//转成JSON数组
            callback(users);
        }
    })
}

exports.saveUser =function(res, users, callback) {
    fs.writeFile('./users.json',JSON.stringify(users), function (err, result) {
        if (err) {
            res.statusCode = 500;
            res.send('Server Error');
        } else {
            callback();
        }
    })
}