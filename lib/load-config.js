var path = require('path');
require('js-yaml');
module.exports = function(grunt, options) {
  var cwd = process.cwd();

  var defaults = {
    configPath: path.join(cwd, 'grunt'),
    init: true
  };

  options = grunt.util._.extend({}, defaults, options);

  var glob = require('glob');
  var object = {};
  var key;
  var aliases;

  glob.sync('*', {cwd: options.configPath}).forEach(function(option) {
    key = option.replace(/\.(js|yaml|coffee)$/,'');
    var fullPath = path.join(options.configPath, option);
    var settings = require(fullPath);
    if (key == 'aliases') {
      aliases = settings;
    } else {
      object[key] = grunt.util._.isFunction(settings) ?
        settings(grunt) : settings;
    }
  });

  object.package = grunt.file.readJSON(path.join(cwd, 'package.json'));

  if (options.config) {
    grunt.util._.merge(object, options.config);
  }

  if (options.loadGruntTasks !== false) {
    var loadTasksOptions = options.loadGruntTasks || {};
    require('load-grunt-tasks')(grunt, loadTasksOptions);
  }

  if (options.init) {
    grunt.initConfig(object);
  }

  if (aliases) {
    for (var taskName in aliases) {
      grunt.registerTask(taskName, aliases[taskName]);
    }
  }

  return object;

};
