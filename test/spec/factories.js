var User = require('../../app/models/user');

exports.createUser = function(data) {
  return new User(data || {
    email: 'foobar@example.com',
    password: 'foobar'
  });
};