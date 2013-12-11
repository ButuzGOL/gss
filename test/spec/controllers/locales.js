var request = require('supertest'),
    should = require('should'),
    
    app = require('../server'),

    locale = require('../../../config/locales/en');

describe('Locales', function() {
  describe('GET /locales/:lang', function() {
    it('should get locale', function(done) {
      request(app)
        .get('/locales/en')
        .expect(200, function(err, res) {
          if (err) return done(err);
          
          res.body.should.eql(locale);

          done();
        });
    });
    it('should throw not found', function(done) {
      request(app)
        .get('/locales/notfound')
        .expect(404, done);
    });
  });
});