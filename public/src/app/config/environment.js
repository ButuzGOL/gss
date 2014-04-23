/**
 * Environment config
 *
 * @module config/environment
 */
define(function() {
  'use strict';

  return {
    development: {
      api: {
        root: 'http://localhost:3000'
      }
    },
    production: {
      api: {
        root: window.location.protocol + '//' + window.location.hostname +
          ((window.location.port) ? ':' + window.location.port : '')
      }
    },
    test: {
      api: {
        root: 'http://localhost:3001'
      }
    }
  };
});
