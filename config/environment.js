module.exports = {
  development: {
    port: 3000,
    root: require('path').normalize(__dirname + '/..'),
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
      'mongodb://localhost/gss'
  },
  test: {
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
      'mongodb://localhost/gss-test',
    port: 3008
  }
};
