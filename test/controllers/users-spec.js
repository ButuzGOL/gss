var request = require('supertest'),
    should = require('should'),

    app = require('../server'),

    helper = require('../helper'),
    factories = require('../factories'),
    
    User = require('../../app/models/user');

describe('Users', function() {
  var fakeUser = {
        email: 'foobar@example.com',
        password: 'foobar'
      },
      accessToken,
      signin = function(done) {
        helper.signin(request(app), fakeUser)
          .expect(200, function(err, res) {
            if (err) return done(err);
            
            accessToken = res.body.accessToken;

            done();
          });
      };

  before(function(done) {
    User.remove(function() {
      user = factories.createUser(fakeUser);
      user.save(done);
    });
  });

  describe('POST /users', function() {
    context('when not logged in', function() {
      it('should throw unauthorized', function(done) {
        request(app)
          .post('/users')
          .field('email', 'foobar1@example.com')
          .field('password', fakeUser.password)
          .expect(401)
          .expect(/Unauthorized/)
          .end(done);
      });
    });
    context('when logged in', function() {
      before(function(done) {
        signin(done);
      });
      it('should save user', function(done) {
        request(app)
          .post(helper.addAccessTokenToUrl('/users', accessToken))
          .field('email', 'foobar1@example.com')
          .field('password', fakeUser.password)
          .expect(200, function(err, res) {
            if (err) return done(err);

            res.body.should.have.property('_id');
            res.body['_id'].should.be.ok;

            done();
          });
      });
      it('should not save user', function(done) {
        request(app)
          .post(helper.addAccessTokenToUrl('/users', accessToken))
          .expect(200, function(err, res) {
            if (err) return done(err);

            res.body.should.have.property('errors');
            res.body.errors.should.have.properties('email', 'password');

            done();
          });
      });
    });
  });
  describe('GET /users/me', function() {
    context('when not logged in', function() {
      it('should throw unauthorized', function(done) {
        request(app)
          .get('/users/me')
          .expect(401)
          .expect(/Unauthorized/)
          .end(done);
      });
    });
    context('when logged in', function() {
      before(function(done) {
        signin(done);
      });
      it('should response current user info', function(done) {
        request(app)
          .get(helper.addAccessTokenToUrl('/users/me', accessToken))
          .expect(200, function(err, res) {
            if (err) return done(err);
            
            res.body.should.have.property('_id');
            res.body['_id'].should.be.ok;

            done();
          });
      });
    });
  });
});