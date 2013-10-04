var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    uid = require('uid');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  },
  password: {
    type: String,
    required: true
  },
  accessToken: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
});


UserSchema.pre('save', function(next) {
  var user = this,
      SALT_WORK_FACTOR = 10;

  user.accessToken = uid(10);

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      
      user.password = hash;

      next();
    });
  });

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  var user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);