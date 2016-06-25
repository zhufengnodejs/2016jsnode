var fs = require('fs');
module.exports = function(app){
  var files = fs.readdirSync(__dirname);
  files.forEach(function(file){
      if(file != 'index.js'){
          require('./'+file)(app);
      }
  });
}