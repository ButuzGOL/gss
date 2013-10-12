var express = require('express'),
    http = require('http'),
    log = require('./lib/log')(module),
    passport = require('passport');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/environment')[env];

require('./config/mongoose')(config);

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