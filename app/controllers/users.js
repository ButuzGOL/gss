var _ = require('lodash');

exports.me = function(req, res) {
  res.json(_.pick(req.user, '_id', 'email'));
};