module.exports = function (grunt, config) {
  return {
    all: [
      'Gruntfile.js',
      'grunt/*.js',
      'lib/*.js',
      'test/*.js'
    ],
    dummy: config.folders
  };
};
