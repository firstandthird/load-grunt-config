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

    // Check if multi config
    if (fileName.match(/-tasks$/)) {
      var target = fileName.replace(/-tasks$/, '');
      var newTarget;
      var spl;
      var originalKey;

      for (var newKey in content) {
        if (content.hasOwnProperty(newKey)) {
          newTarget = target;
          originalKey = newKey;

          if (newKey.indexOf('__') != -1) {
            spl = newKey.split('__');
            newKey = spl.shift();
            newTarget = target + '_' + spl.shift();
          }

          if (!result[newKey]) {
            result[newKey] = {};
          }

          result[newKey][newTarget] = content[originalKey];
        }
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
