var User = require('../app/models/user'),
    LocalStrategy = require('passport-local').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find(id, function(err, user) {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function(login, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }

        done(null, false, { message: 'Invalid password' });
      });
    });
  }));


  passport.use(new BearerStrategy({}, function(authenticationToken, done) {
    process.nextTick(function() {
      User.findOne({ authenticationToken: authenticationToken },
        function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        return done(null, user, { message: 'Invalid authentication token' });
      });
    });
  }));
  
};