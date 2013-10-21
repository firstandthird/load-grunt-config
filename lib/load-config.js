var path = require('path');
require('js-yaml');
module.exports = function(grunt, options) {

  var defaults = {
    configPath: 'grunt',
    init: true
  };

  options = grunt.util._.extend({}, defaults, options);

  var glob = require('glob');
  var object = {};
  var key;
  var cwd = process.cwd();

  glob.sync('*', {cwd: options.configPath}).forEach(function(option) {
    key = option.replace(/\.(js|yaml)$/,'');
    var fullPath = path.join(cwd, options.configPath, option);
    var settings = require(fullPath);
    object[key] = grunt.util._.isFunction(settings) ?
      settings(grunt) : settings;
  });

  object.package = grunt.file.readJSON(path.join(cwd, 'package.json'));

  if (options.config) {
    grunt.util._.extend(object, options.config);
  }

  if (options.loadGruntTasks !== false) {
    var loadTasksOptions = options.loadGruntTasks || {};
    require('load-grunt-tasks')(grunt, loadTasksOptions.pattern, loadTasksOptions.package);
  }

  if (options.init) {
    grunt.initConfig(object);
  }

  return object;

};
