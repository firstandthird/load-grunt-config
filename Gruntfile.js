module.exports = function(grunt) {

  require('./index')(grunt, {
    config: {
      doc: 'README.md',
      design: 'clean',
      data: {
        pageTitle: 'load-grunt-config - Modularize your Gruntfile',
        analytics: 'UA-24017782-2',
        github: 'github.com/firstandthird/load-grunt-config',
        builtBy: 'First + Third',
        twitterShare: 'load-grunt-config - Modularize your Gruntfile'
      }
    }
  });

};
