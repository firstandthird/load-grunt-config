var readConfigDir = require('./readconfigdir');
var _ = require('lodash-node');

module.exports = function(grunt, options) {
  return _([[options.configPath], [options.overridePath]])
    .flatten()
    .compact()
    .reduce(function (config, configPath) {
      var overrideConfig = readConfigDir(configPath, grunt, options.data);
      return _.merge(config, overrideConfig);
    }, {});
};
