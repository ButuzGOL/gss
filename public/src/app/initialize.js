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
    return window.console.log.apply(window.console, arguments);
  } catch (error) {}
};