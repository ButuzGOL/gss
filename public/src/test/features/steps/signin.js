var myStepDefinitionsWrapper = function () {
  var formSelector = '#sessions-new-form-container form';
  
  this.World = require('../support/world.js').World;
  
  this.Given(/^a user visits the home page$/, function(callback) {
    this.spooky.thenOpen(this.baseUrl, function() {
      console.log(2);
    });
  });

  this.When(/^he submits invalid signin information$/, function(callback) {
    this.spooky.waitForSelector(formSelector, function() {
      this.fill(formSelector, {
        email: 'email@email.com',
        password: 'fail'
      }, true);
      this.echo('was submits');
      callback();
    });
  });

  this.Then(/^he should see an error message$/, function(callback) {
    this.spooky.waitForSelector(formSelector + ' .alert.alert-danger',
      function() {
        this.echo('ok');
        callback();
      }
    );
  });

  this.Given(/^the user has an account$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.When(/^the user submits valid signin information$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^he should see a signout link$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

};

module.exports = myStepDefinitionsWrapper;