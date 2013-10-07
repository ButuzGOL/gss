var Setting = require('../models/setting');

exports.index = function(req, res, next) {
  res.json({
    title: 'Title',
    work: 'work'
  });
};