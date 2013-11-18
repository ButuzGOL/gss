var should = require('should'),

    app = require('../server'),
    
    factories = require('../factories'),

    User = require('../../app/models/user');

describe('User', function() {
  var user;

  beforeEach(function(done) {
    User.remove(done);
    user = factories.createUser();
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
        var anotherUser = factories.createUser();

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

  describe('#comparePassword()', function() {
    it('should be equal', function(done) {

      user.save(function(err, user) {
        user.comparePassword('foobar', function(err, isMatch) {
          should.not.exist(err);

          isMatch.should.be.true;
          done();
        });
      });
    });

    it('should not be equal', function(done) {
      user.save(function(err, user) {
        user.comparePassword('foobar1', function(err, isMatch) {
          should.not.exist(err);

          isMatch.should.be.false;
          done();
        });
      });
    });
  })
});