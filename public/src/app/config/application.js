/**
 * Application config
 *
 * @module config/application
 */
define([
  'has'
], function(has) {
  'use strict';

  return {
    title: 'Gone in Sixty Seconds',
    controllerSuffix: '',
    locale: 'en',
    environment: has('production') ? 'production' : 'development'
  };
});