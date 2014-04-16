module.exports = function(grunt) {

  require('./index')(grunt, {
    config: {
      data: {
        doc: 'README.md',
        design: 'clean',
        ghPageData: {
          pageTitle: 'load-grunt-config - Modularize your Gruntfile',
          analytics: 'UA-24017782-2',
          github: 'github.com/firstandthird/load-grunt-config',
          builtBy: 'First + Third',
          twitterShare: 'load-grunt-config - Modularize your Gruntfile'
        }
      }
    }
  });

};
