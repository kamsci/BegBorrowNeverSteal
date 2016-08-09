var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// static folder to include other js, etc files
app.use(express.static(__dirname + '/public/'));
// needed to create an item
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// logging for debugging
app.use(require('morgan')('dev'));

////////////////////////////////////////////////

// Controllers
app.use('/api/borrow-stuff', require('./controllers/borrow.js'));

// Call Angular for front end routing
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

////////////////////////////////////////////////

var server = app.listen(process.env.PORT || 3000);
module.exports = server;