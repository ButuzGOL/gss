var User = require('../app/models/user'),
    LocalStrategy = require('passport-local').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    log = require('../lib/log')(module);

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find(id, function(err, user) {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy({ usernameField: 'email' },
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        var message;

        if (err) {
          return done(err);
        }

        if (!user) {
          message = 'Unknown user';
          log.info('Auth: ' + message);
          return done(null, false, { message: message });
        }

        user.comparePassword(password, function(err, isMatch) {
          if (err) {
            return done(err);
          }

          if (isMatch) {
            return done(null, user);
          } else {
            message = 'Invalid password';
            log.info('Auth: ' + message);
            return done(null, false, { message: message });
          }
        });
      });
    })
  );

  passport.use(new BearerStrategy({}, function(accessToken, done) {
    process.nextTick(function() {
      User.findOne({ accessToken: accessToken },
        function(err, user) {
          var message;

          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, user);
          } else {
            message = 'Invalid authentication token';
            log.info('Auth: ' + message);
            return done(null, false,
              { message: message });
          }
        }
      );
    });
  }));
  
};