/* jshint strict: false */

var url = 'http://localhost:9000/';

casper.test.begin('Signin fail', 2, function(test) {
  casper.start(url, function() {
    var form = '#sessions-new-form-container form';
    
    this.waitForSelector(form, function() {
      test.pass('Form is done');

      this.fill(form, {
        email: 'email@email.com',
        password: 'fail'
      }, true);
    });

    this.waitForSelector(form + ' .alert.alert-danger', function() {
      test.pass('Error message is done');
    });

  }).run(function() {
    test.done();
  });
});

casper.test.begin('Signin success', 2, function(test) {
  casper.start(url, function() {
    var form = '#sessions-new-form-container form';
    
    this.waitUntilVisible(form, function() {
      test.pass('Form is done');

      this.fill(form, {
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