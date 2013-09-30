var User = require('../models/user'),
    passport = require ('passport');

exports.create = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ message: info.message });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.send(_.pick(user, 'authenticationToken'));
    });
  })(req, res, next);
}

exports.destroy = function(req, res) {
  req.logout();
}