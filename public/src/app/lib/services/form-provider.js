define([
  'jquery',
  'underscore',
  'settings',
  'lib/services/provider',
  'models/user'
], function($, _, settings, ServiceProvider, UserModel) {
  'use strict';

  var FormProvider = function() {
    _.extend(this, ServiceProvider.prototype);
    
    ServiceProvider.prototype.constructor.call(this, arguments);

    this.accessToken = localStorage.getItem('accessToken');
    
    this.subscribeEvent('auth:setToken', this.setToken);
  };

  _.extend(FormProvider.prototype, {
    baseUrl: settings.api.root
  });

  FormProvider.prototype.setToken = function(token) {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.clear();
    }

    this.accessToken = token;
  };

  FormProvider.prototype.load = function() {
    this.resolve();
    return this;
  };

  FormProvider.prototype.isLoaded = function() {
    return true;
  };

  FormProvider.prototype.ajax = function(type, url, data) {
    url = this.baseUrl + url;
    if (this.accessToken) {
      url += '?access_token=' + this.accessToken;
    }

    return $.ajax({
      url: url,
      data: data,
      type: type,
      dataType: 'json'
    });
  };

  FormProvider.prototype.triggerSignin = function(signinContext) {
    this.getSigninStatus();
  };

  FormProvider.prototype.signinHandler = function(signinContext, response) {
    if (response) {
      this.setToken(response.accessToken);
    
      // Publish successful signin
      this.publishEvent('signinSuccessful', {
        provider: this,
        signinContext: signinContext
      });

      // Publish the session
      this.getUserData().done(this.processUserData);
    } else {
      this.publishEvent('signinFail', {
        provider: this,
        signinContext: signinContext
      });
    }
  };

  FormProvider.prototype.getUserData = function() {
    return this.ajax('GET', '/users/me');
  };
  
  FormProvider.prototype.processUserData = function(response) {
    this.publishEvent('userData', response);
  };

  FormProvider.prototype.getSigninStatus = function(callback) {
    if (!this.accessToken) {
      this.publishEvent('signinStatus', false);
      return;
    }

    callback = callback || _.bind(this.signinStatusHandler, this);
    this.getUserData().always(callback);
  };

  FormProvider.prototype.signinStatusHandler = function(response, status) {
    var parsed;

    if (!response || status === 'error') {
      this.publishEvent('signout');
    } else {
      parsed = UserModel.prototype.parse.call(null, response);
      this.publishEvent('serviceProviderSession', _.extend(parsed, {
        provider: this,
        userId: response._id,
        accessToken: this.accessToken
      }));
    }
  };

  return FormProvider;
});