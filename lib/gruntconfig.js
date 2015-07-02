var readConfigDir = require('./readconfigdir');
var _ = require('lodash');
var extend = require('config-extend');

module.exports = function(grunt, options) {
  var merge = options.mergeFunction || extend;
  return _([[options.configPath], [options.overridePath]])
    .flatten()
    .compact()
    .reduce(function (config, configPath) {
      var overrideConfig = readConfigDir(configPath, grunt, options);
      return merge(config, overrideConfig);
    }, {});
};
