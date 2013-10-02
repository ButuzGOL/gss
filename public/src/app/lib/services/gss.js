define([
  'jquery',
  'underscore',
  'config',
  'lib/services/service-provider',
  'models/user'
], function($, _, config, ServiceProvider, UserModel) {
  'use strict';

  var GSS = function() {
    _.extend(this, ServiceProvider.prototype);
    
    ServiceProvider.prototype.constructor.call(this, arguments);

    this.accessToken = localStorage.getItem('accessToken');
    var authCallback = _.bind(this.loginHandler, this, this.loginHandler);
    
    this.subscribeEvent('auth:setToken', this.setToken);
    this.subscribeEvent('auth:callback:ostio', authCallback);
  };

  _.extend(GSS.prototype, {
    baseUrl: config.api.root
  });

  GSS.prototype.setToken = function(token) {
    console.log('Ostio#setToken', token);
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.clear();
    }

    this.accessToken = token;
  };

  GSS.prototype.load = function() {
    this.resolve();
    return this;
  };

  GSS.prototype.isLoaded = function() {
    return true;
  };

  GSS.prototype.ajax = function(type, url, data) {
    console.log('ajax', url, this.accessToken, this);
    url = this.baseUrl + url;
    if (this.accessToken) {
      url += '?access_token=' + this.accessToken;
    }

    $.ajax({
      url: url,
      data: data,
      type: type,
      dataType: 'json'
    });
  };

  // Trigger login popup
  GSS.prototype.triggerLogin = function(loginContext) {
    var callback = _.bind(this.loginHandler, this, this.loginHandler);
    window.location = URL;
  };

  GSS.prototype.loginHandler = function(loginContext, response) {
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

  GSS.prototype.getUserData = function() {
    return this.ajax('get', '/users/me');
  };
  
  GSS.prototype.processUserData = function(response) {
    this.publishEvent('userData', response);
  };

  GSS.prototype.getLoginStatus = function(callback) {
    this.getUserData().always(callback || this.loginStatusHandler);
  };

  GSS.prototype.loginStatusHandler = function(response, status) {
    var parsed;

    if (!response || status === 'error') {
      this.publishEvent('logout');
    } else {
      parsed = UserModel.prototype.parse.call(null, response);
      this.publishEvent('serviceProviderSession', _.extend(parsed), {
        provider: this,
        userId: response.id,
        accessToken: this.accessToken
      });
    }
  };

  return GSS;
});