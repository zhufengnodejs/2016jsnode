var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();
app.use(bodyParser.json());
routes(app);
app.listen(9090);