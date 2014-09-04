var readConfigDir = require('./readconfigdir');
var _ = require('lodash-node');

module.exports = function(grunt, options) {

  var config = readConfigDir(options.configPath, grunt, options.data);

  if (options.overridePath) {
    config = _.clone(config, true);

    _([options.overridePath])
      .flatten()
      .compact()
      .forEach(function (overridePath) {
        var overrideConfig = readConfigDir(overridePath, grunt, options.data);
        _.merge(config, overrideConfig);
      });
  }

  return config;
};
