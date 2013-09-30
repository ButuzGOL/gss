var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    log = require('./lib/log')(module),
    passport = require('passport');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/environment')[env],
    db;
    
// Bootstrap database
log.info('Connecting to database at ' + config.db);
mongoose.connect(config.db);
db = mongoose.connection;

db.on('error', function (err) {
  log.error('connection error:', err.message);
});
db.once('open', function callback () {
  log.info("Connected to DB!");
});

require('./config/passport')(passport);

var app = express();
// express settings
require('./config/express')(app, config, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

// Start the app by listening on <port>
var port = process.env.PORT || config.port || 3000;
http.createServer(app).listen(port, function() {
  log.info('GSS app running on port ' + port);
});