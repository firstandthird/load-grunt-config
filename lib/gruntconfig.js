var readConfigDir = require('./readconfigdir');
var _ = require('lodash-node');

module.exports = function(grunt, options, callback) {

  readConfigDir(options.configPath, grunt, options.data, function(err, config) {

    if (options.overridePath) {
      config = _.clone(config, true);
      readConfigDir(options.overridePath, grunt, options.data, function(err, overrideConfig) {

        _.merge(config, overrideConfig);

        callback(err, config);

      });

    } else {
      callback(err, config);
    }

  });

};
