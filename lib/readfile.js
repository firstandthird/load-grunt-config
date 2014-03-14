var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function(file) {

  var ext = path.extname(file);
  var obj;

  if (fs.existsSync(file)) {
    if (ext.match(/ya?ml/)) {
      var res = fs.readFileSync(file, 'utf8');
      obj = yaml.safeLoad(res);
    } else if (ext.match(/json|js|coffee/)) {
      obj = require(file);
    } else {
      throw new Error(file + ' is an unsupported filetype');
    }
  } else {
    throw new Error(file + ' doesn\'t exist');
  }
  return obj;
};
