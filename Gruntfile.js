module.exports = function(grunt) {

  var path = require('path');
  require('./lib/load-config')(grunt, {
    defaultPath: path.join(process.cwd(), 'grunt'),
    configPath: path.join(process.cwd(), 'custom'),
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
