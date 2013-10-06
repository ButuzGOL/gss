var User = require('../models/user'),
    passport = require ('passport'),
    _ = require('lodash');

exports.create = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return _.delay(function() {
        return res.json({ message: info.message });
      }, 1000);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.send(_.pick(user, 'accessToken'));
    });
  })(req, res, next);
};

exports.destroy = function(req, res) {
  req.logout();
};