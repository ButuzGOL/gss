var log = require('../../lib/log')(module);

exports.index = function(req, res, next) {
  var locale;
  try {
    locale = require('../../config/locales/' + req.params.lang);
  } catch(e) {
    log.error('Locale ' + req.params.lang + ' not found');
    return res.send(404);
  }

  res.json(locale);
};