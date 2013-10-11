var frontendSettings = require('../../config/frontend');

exports.index = function(req, res, next) {
  
  // res.json(frontendSettings);

  res.json(403, {
    code: 1,
    message: 'Hala',
    description: 'Ole'
  });
};