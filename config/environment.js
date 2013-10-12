module.exports = {
  development: {
    port: 3000,
    root: require('path').normalize(__dirname + '/..'),
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
      'mongodb://localhost/gss'
  }
};
