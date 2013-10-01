define([
  'jquery',
  'underscore',
  'chaplin/lib/event_broker',
  'lib/utils'
], function($, _, EventBroker, utils) {
  'use strict';

  var ServiceProvider = function() {
    _(this).extend($.Deferred());

    utils.deferMethods({
      deferred: this,
      methods: ['triggerLogin', 'getLoginStatus'],
      onDeferral: this.load
    });
  };

  _.extend(ServiceProvider.prototype, EventBroker);

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