var frontendConfig = require('../../config/frontend');

exports.index = function(req, res, next) {
  
  res.json(frontendConfig);

  // res.json(403, {
  //   code: 1,
  //   message: 'Hala',
  //   description: 'Ole'
  // });
};