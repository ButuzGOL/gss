var Setting = require('../models/setting'),
    _ = require('lodash');

exports.index = function(req, res, next) {
  Setting.find(function(err, settings) {
    if (err) {
      return res.send(err);
    }
    var result = {};
    
    _.forEach(settings, function(setting) {
      result[setting.key] = setting.value;
    });
    res.json(400, {
      code: 1,
      message: 'Hala',
      description: 'Ole'
    })
    //res.send(result);
  });
};