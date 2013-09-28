var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    log = require('./lib/log')(module);

var env = process.env.NODE_ENV || 'development',
    config = require('./config/environment')[env];
    
// Bootstrap database
log.info('Connecting to database at ' + config.db);
mongoose.connect(config.db);

var app = express();
// express settings
require('./config/express')(app, config);

// Bootstrap routes
require('./config/routes')(app);

// Start the app by listening on <port>
var port = process.env.PORT || config.port || 3000;
http.createServer(app).listen(port, function() {
  log.info('GSS app running on port ' + port);
});