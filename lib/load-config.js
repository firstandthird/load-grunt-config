var path = require('path');
var _ = require('lodash-node/modern/objects');
var jsYaml = require('js-yaml');
var fs = require('fs');

module.exports = function(grunt, options) {
  var cwd = process.cwd();

  var defaults = {
    configPath: path.join(cwd, 'grunt'),
    init: true
  };

  options = _.extend({}, defaults, options);

  var glob = require('glob');
  var object = {};
  var key;
  var aliases;

  glob.sync('*.{js,yml,yaml,coffee}', {cwd: options.configPath}).forEach(function(option) {
    key = option.replace(/\.(js|yml|yaml|coffee)$/,'');
    var fullPath = path.join(options.configPath, option);
    var isYaml = /\.ya?ml$/.test(option);
    var settings = isYaml ? jsYaml.safeLoad(fs.readFileSync(fullPath, 'utf8')) : require(fullPath);
    if (key == 'aliases') {
      aliases = settings;
    } else {
      object[key] = _.isFunction(settings) ?
        settings(grunt) : settings;
    }
  });

  object.package = grunt.file.readJSON(path.join(cwd, 'package.json'));

  if (options.config) {
    _.merge(object, options.config);
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
