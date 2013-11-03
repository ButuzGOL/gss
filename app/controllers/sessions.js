var passport = require ('passport'),
    _ = require('lodash');

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

      res.send(_.pick(user, 'accessToken'));
    });
  })(req, res, next);
};

exports.destroy = function(req, res, next) {
  req.logout();
  res.send(200);
};