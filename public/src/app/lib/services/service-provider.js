define([
  'jquery',
  'underscore',
  'chaplin',
  'lib/utils'
], function($, _, Chaplin, utils) {
  'use strict';

  var ServiceProvider = function() {
    _.extend(this, $.Deferred());

    utils.deferMethods({
      deferred: this,
      methods: ['triggerLogin', 'getLoginStatus'],
      onDeferral: this.load
    });
  };

  _.extend(ServiceProvider.prototype, Chaplin.EventBroker);

  _.extend(ServiceProvider.prototype, {
    loading: false,
    disposed: false,
  });

  ServiceProvider.prototype.dispose = function() {
    if (this.disposed) {
      return;
    }

    this.unsubscribeAllEvents();
    this.disposed = true;
    if (_.isFunction(Object.freeze)) {
      Object.freeze(this);
    }
  };

  return ServiceProvider;
});