var path = require('path');
require('js-yaml');
module.exports = function(grunt, options) {
  var cwd = process.cwd();

  var defaults = {
    configPath: path.join(cwd, 'grunt'),
    defaultPath: null,
    init: true
  };

  options = grunt.util._.extend({}, defaults, options);

  var glob = require('glob');
  var defaultConfig = {}, customConfig = {};
  var aliases = null, object = {};

  function getConfig(configPath) {
    var config = {};
    config.aliases = null;
    config.settings = {};

    glob.sync('*', {cwd: configPath}).forEach(function(option) {
      var key = option.replace(/\.(js|yaml|coffee)$/,'');
      var fullPath = path.join(configPath, option);
      var settings = require(fullPath);
      if(key == 'aliases') {
        config.aliases = settings;
      } else {
        config.settings[key] = grunt.util._.isFunction(settings) ?
          settings(grunt) : settings;
      }
    });

    return config;
  }

  customConfig = getConfig(options.configPath);
 
  if(options.defaultPath !== null) {
    defaultConfig = getConfig(options.defaultPath);
    aliases = grunt.util._.merge(defaultConfig.aliases, customConfig.aliases);
    object = grunt.util._.merge(defaultConfig.settings, customConfig.settings);
  } else {
    aliases = customConfig.aliases;
    object = customConfig.settings;
  }

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
