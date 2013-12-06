/* jshint strict: false */

casper.test.begin('Signin fail', 2, function(test) {
  casper.start('http://localhost:9000/', function() {
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
  casper.start('http://localhost:9000/', function() {
    var form = '#sessions-new-form-container form';
    
    this.waitUntilVisible(form, function() {
      test.pass('Form is done');

      this.fillSelectors(form, {
        'input[name="email"]': 'email@email.com',
        'input[name="password"]': 'password'
      }, true);
    });

    this.waitForSelector(form + ' .alert.alert-danger', function() {
      test.pass('Error message is done');
    });
  }).run(function() {
    test.done();
  });
});