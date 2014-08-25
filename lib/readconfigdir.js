var parseDir = require('parse-dir');
var _ = require('lodash-node');

module.exports = function(dir, grunt, options) {
  var files = parseDir(dir + '/' + '*.{js,json,yml,yaml,coffee,ls}');
  var result = {};

  files.forEach(function(file) {
    var content = file.contents;
    var fileName = file.basename;

    if (_.isFunction(content)) {
      content = content(grunt, options);
    }

<<<<<<< Updated upstream
    //check if multi config
    if (key.match(/-tasks$/)) {
      var target = key.replace(/-tasks$/, '');
      for (var newKey in result) {
        var newTarget = target;
        var originalKey = newKey;
        if (newKey.indexOf('__') != -1) {
          var spl = newKey.split('__');
          newKey = spl[0];
          newTarget = target + '_' + spl[1];
        }
        if (!obj[newKey]) {
          obj[newKey] = {};
        }
        obj[newKey][newTarget] = result[originalKey];
=======
    // Check if multi config
    if (fileName.match(/-tasks$/)) {
      var target = fileName.replace(/-tasks$/, '');

      for (var newKey in content) {
        if (content.hasOwnProperty(newKey)){
          if (!result[newKey]) {
            result[newKey] = {};
          }
          result[newKey][target] = content[newKey];
        }
>>>>>>> Stashed changes
      }
    } else {
      if (!result[fileName]) {
        result[fileName] = {};
      }

      result[fileName] = _.merge(result[fileName], content);
    }
  });

  return result;
};
