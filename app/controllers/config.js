var frontendSettings = require('../../config/frontend');

exports.index = function(req, res, next) {
  
  res.json(frontendSettings);

  // res.json(400, {
  //   code: 1,
  //   message: 'Hala',
  //   description: 'Ole'
  // });
};