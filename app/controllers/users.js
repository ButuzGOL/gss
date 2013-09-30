var User = require('../models/user'),
    _ = require('lodash');

exports.create = function(req, res) {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) {
      return res.send(err);
    }
      
    res.send(_.pick(user, '_id'));
  });
}

exports.me = function(req, res) {
  res.json({ email: req.user.email });
}