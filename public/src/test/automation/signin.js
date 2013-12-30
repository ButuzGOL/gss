/* jshint strict: false */

var url = 'http://localhost:9000/';

casper.test.begin('Signin fail', 2, function(test) {
  casper.start(url, function() {
    var formSelector = '#sessions-new-form-container form';
    
    this.waitForSelector(formSelector, function() {
      test.pass('Form is done');

      this.fill(formSelector, {
        email: 'email@email.com',
        password: 'fail'
      }, true);
    });

    this.waitForSelector(formSelector + ' .alert.alert-danger', function() {
      test.pass('Error message is done');
    });

  }).run(function() {
    test.done();
  });
});

casper.test.begin('Signin success', 2, function(test) {
  casper.start(url, function() {
    var formSelector = '#sessions-new-form-container form';
    
    this.waitUntilVisible(formSelector, function() {
      test.pass('Form is done');

      this.fill(formSelector, {
        email: 'email@email.com',
        password: 'password'
      }, true);

      this.waitForSelector('#signout', function() {
        test.pass('Signout is done');
      });
    });
  }).run(function() {
    test.done();
  });
});