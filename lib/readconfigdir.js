var glob = require('glob');
var async = require('async');
var readfile = require('./readfile');
var path = require('path');
var _ = require('lodash');

module.exports = function(dir, grunt, options, callback) {

  var getKey = function(file) {
    return file.replace(/\.(js|yml|yaml|coffee)$/,'');
  };

  glob('*.{js,yml,yaml,coffee}', { cwd: dir }, function(err, files) {
    if (err) {
      return callback(err);
    }

    var fullPaths = files.map(function(file) {
      return path.join(dir, file);
    });

    async.map(fullPaths, readfile, function(err, results) {

      var obj = {};
      results.forEach(function(result, index) {
        var key = getKey(files[index]);
        if (_.isFunction(result)) {
          result = result(grunt, options);
        }
        obj[key] = result;
      });


      callback(null, obj);

    });


  });


};
