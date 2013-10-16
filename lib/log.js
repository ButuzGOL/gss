var winston = require('winston');

function getLogger(module) {
  var path = module.filename.split('/').slice(-2).join('/');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: path,
        silent: process.env.NODE_ENV === 'test'
      })
    ]
  });
}

module.exports = getLogger;