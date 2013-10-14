process.env.NODE_ENV = 'test';

var request = require('supertest'),
    should = require('should'),
    app = require('../../server'),

    User = require('../../app/models/user');

describe('Users', function () {
  var fakeUser = {
        email: 'foobar@example.com',
        password: 'foobar'
      },
      accessToken;

  before(function (done) {
    User.remove(function() {
      user = new User(fakeUser);
      user.save(done);
    });
  });

  describe('POST /users', function () {
    context('when not logged in', function () {
      it('should throw Unauthorized', function(done) {
        request(app)
          .post('/users')
          .field('email', 'foobar1@example.com')
          .field('password', fakeUser.password)
          .expect(401)
          .expect(/Unauthorized/)
          .end(done);
      });
    });
    context('when logged in', function () {
      before(function (done) {
        request(app)
          .post('/signin')
          .field('email', fakeUser.email)
          .field('password', fakeUser.password)
          .expect(200, function(err, res) {
            if (err) return done(err);
            
            accessToken = res.body.accessToken;

            done();
          });
      });
      it('should save user', function(done) {
        request(app)
          .post('/users?access_token=' + accessToken)
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
      });
    });
  });
  describe('GET /users/me', function () {
    context('when not logged in', function () {
    });
    context('when logged in', function () {
    });
  });
});