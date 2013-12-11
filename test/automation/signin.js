/* jshint strict: false */

var url = 'http://localhost:3000';

casper.test.begin('Signin fail', 1, function(test) {
  casper.start();

  casper.open(url + '/signin', {
    method: 'post',
    headers: {
      'Accept': 'application/json'
    },
    data: {
      'email': 'email@email.com',
      'password':  'fail'
    }
  });

  casper.then(function() {
    test.assertMatch(this.getPageContent(), /message/, 'Message is done');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Signin success', 1, function(test) {
  casper.start();

  casper.open(url + '/signin', {
    method: 'post',
    headers: {
      'Accept': 'application/json'
    },
    data: {
      'email': 'email@email.com',
      'password':  'password'
    }
  });

  casper.then(function() {
    test.assertMatch(this.getPageContent(), /accessToken/,
      'Access toke is done');
  });

  casper.run(function() {
    test.done();
  });
});