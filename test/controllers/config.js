var request = require('supertest'),
    should = require('should'),
    
    app = require('../server'),
    
    frontendConfig = require('../../config/frontend');

describe('Config', function() {
  describe('GET /config', function() {
    it('should get config', function(done) {
      request(app)
        .get('/config')
        .expect(200, function(err, res) {
          if (err) return done(err);
          
          res.body.should.eql(frontendConfig);

          done();
        });
    });
  });
});