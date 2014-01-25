var request = require('supertest'),
    should = require('should'),
    
    app = require('../server'),

    helper = require('../helper'),
    factories = require('../factories'),

    User = require('../../../app/models/user');

describe('Sessions', function() {
  var user,
      fakeUser = {
      email: 'foobar@example.com',
      password: 'foobar'
    };

  before(function(done) {
    User.remove(function() {
      user = factories.createUser(fakeUser);
      user.save(done);
    });
  });

  describe('POST /signin', function() {
    it('should throw unknown user', function(done) {
      request(app)
        .post('/signin')
        .field('email', 'foobar1@example.com')
        .field('password', fakeUser.password)
        .expect(200, function(err, res) {
          if (err) {
            return done(err);
          }
          
          res.body.should.have.property('message', 'Unknown user');

          done();
        });
    });
    it('should throw invalid password', function(done) {
      request(app)
        .post('/signin')
        .field('email', fakeUser.email)
        .field('password', 'foobar1')
        .expect(200, function(err, res) {
          if (err) {
            return done(err);
          }
          
          res.body.should.have.property('message', 'Invalid password');

          done();
        });
    });
    it('should authenticate', function(done) {
      request(app)
        .post('/signin')
        .field('email', fakeUser.email)
        .field('password', fakeUser.password)
        .expect(200, function(err, res) {
          if (err) {
            return done(err);
          }
          
          res.body.should.have.property('accessToken');
          res.body.accessToken.should.be.ok;

          done();
        });
    });
  });

  describe('DELETE /signout', function() {
    it('should throw unauthorized', function(done) {
      request(app)
        .del('/signout')
        .expect(401)
        .expect(/Unauthorized/)
        .end(done);
    });
    it('should signout', function(done) {
      helper.signin(request(app), fakeUser)
        .expect(200, function(err, res) {
          if (err) {
            return done(err);
          }
            
          request(app)
            .del(helper.addAccessTokenToUrl('/signout', res.body.accessToken))
            .expect(200, done);
        });
    });
  });
});