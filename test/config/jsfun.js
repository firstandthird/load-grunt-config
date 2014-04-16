module.exports = function(grunt, options) {
  return {
    jsFunFile: {
      options: {
        filename: 'jsfun.js',
        test: options.test
      }
    }
  };
};
