var log = require('../lib/log')(module),
    mongoose = require('mongoose');

module.exports = function(config) {
  var db;

  // Bootstrap database
  log.info('Connecting to database at ' + config.db);
  mongoose.connect(config.db);
  db = mongoose.connection;

  db.on('error', function (err) {
    log.error('connection error:', err.message);
  });
  db.once('open', function callback () {
    log.info('Connected to DB!');
  });

};