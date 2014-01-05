/**
 * Initialize application
 *
 * @module initialize
 */
require([
  'application',
  'config/routes',
  'config/application'
], function(Application, routes, applicationConfig) {
  'use strict';

  new Application({
    routes: routes,
    controllerSuffix: applicationConfig.controllerSuffix
  });
});

window.log = function() {
  'use strict';

  try {
    return console.log.apply(console, arguments);
  } catch (error) {}
};