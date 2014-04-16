var glob = require('glob');
var async = require('async');
var readfile = require('./readfile');
var path = require('path');
var _ = require('lodash-node');

module.exports = function(dir, grunt, options) {

  var getKey = function(file) {
    var ext = path.extname(file);
    var base = path.basename(file, ext);
    return base;
  };

  var files = glob.sync('*.{js,yml,yaml,coffee}', { cwd: dir });

  var fullPaths = files.map(function(file) {
    return path.join(dir, file);
  });

  var obj = {};
  fullPaths.forEach(function(path) {
    var result = readfile(path);
    var key = getKey(path);
    if (_.isFunction(result)) {
      result = result(grunt, options);
    }
    obj[key] = result;
  });
  return obj;

};
