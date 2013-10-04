define([
  'jquery',
  'underscore',
  'config',
  'lib/services/provider',
  'models/user'
], function($, _, config, ServiceProvider, UserModel) {
  'use strict';

  var FormProvider = function() {
    _.extend(this, ServiceProvider.prototype);
    
    ServiceProvider.prototype.constructor.call(this, arguments);

    this.accessToken = localStorage.getItem('accessToken');
    
    this.subscribeEvent('auth:setToken', this.setToken);
  };

  _.extend(FormProvider.prototype, {
    baseUrl: config.api.root
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

  FormProvider.prototype.triggerLogin = function(loginContext) {
    this.getLoginStatus();
  };

  FormProvider.prototype.loginHandler = function(loginContext, response) {
    if (response) {
      this.setToken(response.accessToken);
    
      // Publish successful login
      this.publishEvent('loginSuccessful', {
        provider: this,
        loginContext: loginContext
      });

      // Publish the session
      this.getUserData().done(this.processUserData);
    } else {
      this.publishEvent('loginFail', {
        provider: this,
        loginContext: loginContext
      });
    }
  };

  FormProvider.prototype.getUserData = function() {
    return this.ajax('GET', '/users/me');
  };
  
  FormProvider.prototype.processUserData = function(response) {
    this.publishEvent('userData', response);
  };

  FormProvider.prototype.getLoginStatus = function(callback) {
    if (!this.accessToken) {
      this.publishEvent('loginStatus', false);
      return;
    }

    callback = callback || _.bind(this.loginStatusHandler, this);
    this.getUserData().always(callback);
  };

  FormProvider.prototype.loginStatusHandler = function(response, status) {
    var parsed;

    if (!response || status === 'error') {
      this.publishEvent('logout');
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