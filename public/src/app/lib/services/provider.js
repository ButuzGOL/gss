define([
  'jquery',
  'underscore',
  'chaplin',
  'lib/utils'
], function($, _, Chaplin, utils) {
  'use strict';

  var Provider = function() {
    _.extend(this, $.Deferred());

    utils.deferMethods({
      deferred: this,
      methods: ['triggerSignin', 'getSigninStatus'],
      onDeferral: this.load
    });
  };

  _.extend(Provider.prototype, Chaplin.EventBroker);

  _.extend(Provider.prototype, {
    loading: false,
    disposed: false,
  });

  Provider.prototype.dispose = function() {
    if (this.disposed) {
      return;
    }

    this.unsubscribeAllEvents();
    this.disposed = true;
    if (_.isFunction(Object.freeze)) {
      Object.freeze(this);
    }
  };

  return Provider;
});