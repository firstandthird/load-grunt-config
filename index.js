var gruntConfig = require('./lib/gruntconfig');
var path = require('path');
var fs = require('fs');
var _ = require('lodash-node');

var cwd = process.cwd();
var defaults = {
  configPath: path.join(cwd, 'grunt'),
  init: true,
  jitGrunt: false,
  loadGruntTasks: {
  },
  data: {}
};

module.exports = function(grunt, options) {

  options = options || {};
  if (options.config) {
    options.data = options.config;
    delete options.config;
  }
  var opts = _.merge({}, defaults, options, options.data);

  var packageJsonPath = path.join(cwd, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    var packageData = require(packageJsonPath);
    opts.data.package = packageData;
  }


  var config = gruntConfig(grunt, opts);

  config = _.merge({}, config, opts.data);

  if (opts.init) {
    grunt.initConfig(config);
  }

  if (opts.jitGrunt === false && opts.loadGruntTasks) {
    require('load-grunt-tasks')(grunt, opts.loadGruntTasks);
  } else if (opts.jitGrunt) {
    require('jit-grunt')(grunt, opts.jitGrunt);
  }

  if (config.aliases) {
    for (var taskName in config.aliases) {
      grunt.registerTask(taskName, config.aliases[taskName]);
    }

  }

  return config;

};
