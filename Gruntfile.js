module.exports = function(grunt) {


  require('load-grunt-config')(grunt, {
    config: {
      masterDoc: 'README.md',
      doc: 'README.md',
      design: 'clean',
      data: {
        pageTitle: 'load-grunt-config - Modularize your Gruntfile',
        analytics: 'UA-24017782-2',
        github: 'github.com/firstandthird/load-grunt-config',
        builtBy: 'First + Third',
        twitterShare: 'load-grunt-config - Modularize your Gruntfile http://firstandthird.github.io/load-grunt-config/'
      }
    }
  });

};
