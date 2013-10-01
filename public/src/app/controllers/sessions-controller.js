define([
  'underscore',
  'chaplin',
  'controllers/base/controller',
  'lib/services/gss',
  'models/user'
], function(_, Chaplin, Controller, GSS, UserModel) {
  'use strict';

  var SessionsController = Controller.extend({
    // Service provider instances as static properties
    // This just hardcoded here to avoid async loading of service providers.
    // In the end you might want to do this.
    serviceProviders: {
      gss: new GSS()
    },
    // Was the login status already determined?
    loginStatusDetermined: false,

    // This controller governs the LoginView
    loginView: null,

    // Current service provider
    serviceProviderName: null,

    initialize: function() {
      // Login flow events
      this.subscribeEvent('serviceProviderSession', this.serviceProviderSession);

      // Handle login
      this.subscribeEvent('logout', this.logout);
      this.subscribeEvent('userData', this.userData);

      // Handler events which trigger an action

      // Show the login dialog
      this.subscribeEvent('!showLogin', this.showLoginView);
      // Try to login with a service provider
      this.subscribeEvent('!login', this.triggerLogin);
      // Initiate logout
      this.subscribeEvent('!logout', this.triggerLogout);

      // Determine the logged-in state
      this.getSession();
    },

    // Load the libraries of all service providers
    loadServiceProviders: function() {
      _.each(this.serviceProviders, function(serviceProvider) {
        serviceProvider.load();
      });
    },

    // Instantiate the user with the given data
    createUser: function(userData) {
      Chaplin.mediator.user = new UserModel(userData);
    },

    // Try to get an existing session from one of the login providers
    getSession: function() {
      this.loadServiceProviders();
      _.each(this.serviceProviders, function(serviceProvider) {
        serviceProvider.done(serviceProvider.getLoginStatus);
      });
    },

    // Handler for the global !showLoginView event
    showLoginView: function() {
      if (this.loginView) {
        return;
      }

      this.loadServiceProviders();

      this.loginView = new LoginView({
        serviceProviders: this.serviceProviders
      });

    },

    // Handler for the global !login event
    // Delegate the login to the selected service provider
    triggerLogin: function(serviceProviderName) {
      var serviceProvider = this.serviceProviders[serviceProviderName];
      
      // Publish an event in case the provider library could not be loaded
      if (!serviceProvider.isLoaded()) {
        this.publishEvent('serviceProviderMissing', serviceProviderName);
        return;
      }
      
      // Publish a global loginAttempt event
      this.publishEvent('loginAttempt', serviceProviderName);

      // Delegate to service provider
      serviceProvider.triggerLogin();
    },

    // Handler for the global serviceProviderSession event
    serviceProviderSession: function(session) {
      // Save the session provider used for login
      this.serviceProviderName = session.provider.name;
      
      // Hide the login view
      this.disposeLoginView();
      
      // Transform session into user attributes and create a user
      session.id = session.userId;
      delete session.userId;
      this.createUser(session);
      
      this.publishLogin();
    },

    publishLogin: function() {
      this.loginStatusDetermined = true;

      // Publish a global login event passing the user
      this.publishEvent('login', Chaplin.mediator.user);
      this.publishEvent('loginStatus', true);
    },

    triggerLogout: function() {
      this.publishEvent('logout');
    },

    logout: function() {
      this.loginStatusDetermined = true;
      this.disposeUser();
      
      // Discard the login info
      this.serviceProviderName = null;

      // Show the login view again
      this.showLoginView();
      this.publishEvent('loginStatus', false);
    },

    userData: function(data) {
      Chaplin.mediator.user.set(data);
    },

    disposeLoginView: function() {
      if (!this.loginView) {
        return;
      }

      this.loginView.dispose();

      this.loginView = null;
    },

    disposeUser: function() {
      if (!Chaplin.mediator.user) {
        return;
      }

      // Dispose the user model  
      Chaplin.mediator.user.dispose();
      // Nullify property on the mediator
      Chaplin.mediator.user = null;
    }
  });

  return SessionsController;
});
