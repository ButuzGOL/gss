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
        root: window.location.protocol + '//' + window.location.hostname
      }
    },
    test: {
      api: {
        root: 'http://localhost:3001'
      }
    }
  };
});