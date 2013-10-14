var config = require('../../config/environment')['test'];
require('../../config/mongoose')(config);

var should = require('should'),
    User = require('../../app/models/user');

describe('User', function () {
  var user,
      fakeUser = {
      email: 'foobar@example.com',
      password: 'foobar'
    };

  beforeEach(function(done) {
    User.remove(done);
    user = new User(fakeUser);
  });

  describe('#save()', function() {
    context('when success', function() {
      it('should save without error', function(done) {
        user.save(done);
      });

      it('should be encrypted password after save', function(done) {
        var password = user.password;

        user.save(function(err, user) {
          should.not.exist(err);
          
          user.should.not.have.property('password', password);
          done();
        });
      });

      it('should generate accessToken value', function(done) {
        user.save(function(err, user) {
          should.not.exist(err);
          
          user.should.have.property('accessToken');
          user.accessToken.should.be.ok;
          done();
        });
      });
    });

    context('when error', function() {
      it('should be wrong email', function(done) {
        user.email = 'foobarexample.com';
        
        user.save(function(err, user) {
          should.exist(err);
          err.errors.email.should.have.property('type', 'regexp');
          done();
        });
      });

      it('should be unique email', function(done) {
        var anotherUser = new User(fakeUser);

        user.save(function(err, user) {
          anotherUser.save(function(err, anotherUser) {
            should.exist(err);
            err.err.should.match(/duplicate.*?email/);
            done();
          });
        });
      });
    });
  });
});