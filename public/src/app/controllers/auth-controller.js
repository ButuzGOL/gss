define([
  'underscore',
  'chaplin',
  'controllers/base/controller',
  'lib/services/form-provider',
  'models/user'
], function(_, Chaplin, Controller, FormProvider, UserModel) {
  'use strict';

  var AuthController = Controller.extend({
    // Service provider instances as static properties
    // This just hardcoded here to avoid async loading of service providers.
    // In the end you might want to do this.
    serviceProviders: {
      formProvider: new FormProvider()
    },
    // Was the signin status already determined?
    signinStatusDetermined: false,

    // Current service provider
    serviceProviderName: null,

    initialize: function() {
      // Signin flow events
      this.subscribeEvent('serviceProviderSession',
        this.serviceProviderSession);

      // Handle signin
      this.subscribeEvent('signout', this.signout);
      this.subscribeEvent('userData', this.userData);

      // Handler events which trigger an action

      // Try to signin with a service provider
      this.subscribeEvent('!signin', this.triggerSignin);
      // Initiate signout
      this.subscribeEvent('!signout', this.triggerSignout);

      // Determine the signin-in state
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

    // Try to get an existing session from one of the signin providers
    getSession: function() {
      this.loadServiceProviders();
      _.each(this.serviceProviders, function(serviceProvider) {
        serviceProvider.done(serviceProvider.getSigninStatus);
      });
    },

    // Handler for the global !signin event
    // Delegate the signin to the selected service provider
    triggerSignin: function(serviceProviderName) {
      var serviceProvider = this.serviceProviders[serviceProviderName];
      
      // Publish an event in case the provider library could not be loaded
      if (!serviceProvider.isLoaded()) {
        this.publishEvent('serviceProviderMissing', serviceProviderName);
        return;
      }
      
      // Publish a global signinAttempt event
      this.publishEvent('signinAttempt', serviceProviderName);

      // Delegate to service provider
      serviceProvider.triggerSignin();
    },

    // Handler for the global serviceProviderSession event
    serviceProviderSession: function(session) {
      // Save the session provider used for signin
      this.serviceProviderName = session.provider.name;
      
      // Transform session into user attributes and create a user
      session.id = session.userId;
      delete session.userId;
      this.createUser(session);
      
      this.publishSignin();
    },

    publishSignin: function() {
      this.signinStatusDetermined = true;

      // Publish a global signin event passing the user
      this.publishEvent('signin', Chaplin.mediator.user);
      this.publishEvent('signinStatus', true);
    },

    triggerSignout: function() {
      this.publishEvent('signout');
    },

    signout: function() {
      this.signinStatusDetermined = true;
      this.disposeUser();
      
      // Discard the signin info
      this.serviceProviderName = null;

      this.publishEvent('signinStatus', false);
    },

    userData: function(data) {
      Chaplin.mediator.user.set(data);
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

  return AuthController;
});
