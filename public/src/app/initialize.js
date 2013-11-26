require(['application', 'config/routes'], function(Application, routes) {
  'use strict';

  new Application({
    routes: routes,
    controllerSuffix: '-controller'
  });
});

window.log = function() {
  'use strict';

  try {
    return console.log.apply(console, arguments);
  } catch (_error) {}
};