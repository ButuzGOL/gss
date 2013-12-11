var sessionsController = require('../app/controllers/sessions'),
    usersController = require('../app/controllers/users'),
    configController = require('../app/controllers/config'),
    localesController = require('../app/controllers/locales');

module.exports = function(app, passport) {
  app.post('/signin', sessionsController.create);
  app.delete('/signout',
    passport.authenticate('bearer', { session: false }),
    sessionsController.destroy);

  app.get('/users/me',
    passport.authenticate('bearer', { session: false }),
    usersController.me
  );

  app.get('/config', configController.index);
  app.get('/locales/:lang', localesController.index);
};