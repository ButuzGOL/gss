var sessions = require('../app/controllers/sessions'),
    users = require('../app/controllers/users'),
    config = require('../app/controllers/config'),
    locales = require('../app/controllers/locales');

module.exports = function(app, passport) {
  app.post('/signin', sessions.create);
  app.delete('/signout', sessions.destroy);

  app.post('/users', users.create);

  app.get('/users/me',
    passport.authenticate('bearer', { session: false }),
    users.me
  );

  app.get('/config', config.index);
  app.get('/locales/:lang', locales.index);
};