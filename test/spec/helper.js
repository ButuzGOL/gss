exports.addAccessTokenToUrl = function(url, accessToken) {
  return url + '?access_token=' + accessToken;
};

exports.signin = function(agent, user) {
  return agent
    .post('/signin')
    .field('email', user.email)
    .field('password', user.password);
};