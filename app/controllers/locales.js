exports.index = function(req, res, next) {
  var locale = require('../../config/locales/' + req.params.lang);
  res.json(locale);
};