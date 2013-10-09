define([
  'underscore',
  'chaplin'
], function(_, Chaplin) {
  'use strict';

  // Application-specific utilities
  // ------------------------------

  // Delegate to Chaplin’s utils module
  var utils = Chaplin.utils.beget(Chaplin.utils);

  // Add additional application-specific properties and methods

  _.extend(utils, {
    dotToNestedObject: function(object) {
      var oo = {}, t,
          parts, part,
          key, k;

      for (k in object) {
        t = oo;
        parts = k.split('.');
        key = parts.pop();
        while (parts.length) {
          part = parts.shift();
          t = t[part] = t[part] || {};
        }
        t[key] = object[k];
      }
      return oo;
    },
    /*
      Wrap methods so they can be called before a deferred is resolved.
      The actual methods are called once the deferred is resolved.
    
      Parameters:
    
      Expects an options hash with the following properties:
    
      deferred
        The Deferred object to wait for.
    
      methods
        Either:
        - A string with a method name e.g. 'method'
        - An array of strings e.g. ['method1', 'method2']
        - An object with methods e.g. {method: -> alert('resolved!')}
    
      host (optional)
        If you pass an array of strings in the `methods` parameter the methods
        are fetched from this object. Defaults to `deferred`.
    
      target (optional)
        The target object the new wrapper methods are created at.
        Defaults to host if host is given, otherwise it defaults to deferred.
    
      onDeferral (optional)
        An additional callback function which is invoked when the method is called
        and the Deferred isn't resolved yet.
        After the method is registered as a done handler on the Deferred,
        this callback is invoked. This can be used to trigger the resolving
        of the Deferred.
    
      Examples:
    
      deferMethods(deferred: def, methods: 'foo')
        Wrap the method named foo of the given deferred def and
        postpone all calls until the deferred is resolved.
    
      deferMethods(deferred: def, methods: def.specialMethods)
        Read all methods from the hash def.specialMethods and
        create wrapped methods with the same names at def.
    
      deferMethods(
        deferred: def, methods: def.specialMethods, target: def.specialMethods
      )
        Read all methods from the object def.specialMethods and
        create wrapped methods at def.specialMethods,
        overwriting the existing ones.
    
      deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
        Wrap the methods obj.foo and obj.bar so all calls to them are postponed
        until def is resolved. obj.foo and obj.bar are overwritten
        with their wrappers.
    */
    deferMethods: function(options) {
      // Process options
      var deferred = options.deferred,
          methods = options.methods,
          host = options.host || deferred,
          target = options.target || host,
          onDeferral = options.onDeferral,
          // Hash with named functions
          methodsHash = {},
          func;

      if (_.isString(methods)) {
        // Transform a single method string into an object
        methodsHash[methods] = host[methods];
      } else if (methods.length && methods[0]) {
        // Transform a method list into an object
        _.forEach(methods, function(name) {
          func = host[name];
          if (!_.isFunction(func)) {
            throw new TypeError('utils.deferMethods: method ' + name + ' not' +
              'found on host ' + host);
          }

          methodsHash[name] = func;
        });
      } else {
        // Treat methods parameter as a hash, no transformation
        methodsHash = methods;
      }

      // Process the hash
      _.forEach(methodsHash, function(func, name) {
        if (!methodsHash.hasOwnProperty(name)) {
          return;
        }
        // Ignore non-function properties
        if (!_.isFunction(func)) {
          return;
        }
        target[name] = utils.createDeferredFunction(
          deferred, func, target, onDeferral
        );
      });
    },
    /* 
      Creates a function which wraps `func` and defers calls to
      it until the given `deferred` is resolved. Pass an optional `context`
      to determine the this `this` binding of the original function.
      Defaults to `deferred`. The optional `onDeferral` function to after
      original function is registered as a done callback.
    */
    createDeferredFunction: function(deferred, func, context, onDeferral) {
      if (_.isUndefined(context)) {
        context = deferred;
      }
      // Return a wrapper function
      return function() {
        // Save the original arguments
        var args = arguments;
        if (deferred.state() === 'resolved') {
          // Deferred already resolved, call func immediately
          func.apply(context, args);
        } else {
          // Register a done handler
          deferred.done(function() {
            func.apply(context, args);
            // Invoke the onDeferral callback
            if (_.isFunction(onDeferral)) {
              onDeferral.apply(context);
            }
          });
        }
      };
    }

  });

  return utils;
});
    