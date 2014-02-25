var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function(file, callback) {

  var ext = path.extname(file);

  if (ext.match(/ya?ml/)) {
    fs.readFile(file, 'utf8', function(err, res) {
      if (err) {
        return callback(err);
      }
      var obj = yaml.safeLoad(res);

      callback(null, obj);

    });
  } else if (ext.match(/json|js|coffee/)) {
    var obj = require(file);
    callback(null, obj);
  } else {
    callback(new Error(file + ' is an unsupported filetype'));
  }

};
