var sessions = require('../app/controllers/sessions'),
    users = require('../app/controllers/users'),
    settings = require('../app/controllers/settings'),
    locales = require('../app/controllers/locales');

module.exports = function(app, passport) {
  app.post('/signin', sessions.create);
  app.delete('/signout', sessions.destroy);

  app.post('/users', users.create);

  app.get('/users/me',
    passport.authenticate('bearer', { session: false }),
    users.me
  );

  app.get('/settings', settings.index);
  app.get('/locales', locales.index);
};