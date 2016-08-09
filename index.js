var express = require('express');
var app = express();
var path = require('path');

// static folder to include other js, etc files
app.use(express.static(__dirname + '/public/'));
////////////////////////////////////////////////

// Call Angular for front end routing
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

////////////////////////////////////////////////

var server = app.listen(process.env.PORT || 3000);
module.exports = server;