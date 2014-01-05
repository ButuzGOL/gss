/**
 * Collection module
 *
 * @module models/base/collection
 */
define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  /**
   * Base collection class
   *
   * @class Collection
   * @constructor
   * @extends Chaplin.Collection
   */
  var Collection = Chaplin.Collection.extend({
    /**
     * Collection should has model so base model by default
     * 
     * @property model
     * @type {Model}
     */
    model: Model
  });

  return Collection;
});
