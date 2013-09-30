var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    log = require('../lib/log')(module);

module.exports = function(app, config, passport) {
  app.set('showStackError', true);
  
  app.use(express.compress({
    filter: function(req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    next();
  });

  app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
      secret: 'gss',
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express['static'](__dirname + '/../public'));

    app.use(require('connect-assets')({
      src: '/../app/assets'
    }));

    app.use(app.router);
  });

  app.configure('development', function() {
    log.info('Configuring development environment');

    app.use(express.errorHandler());
    app.locals.pretty = true;
    app.use(express.logger());
  });
};