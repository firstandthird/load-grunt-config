module.exports = function (grunt, options) {
  return {
    cjsFunFile: {
      options: {
        filename: 'cjsfun.cjs',
        test: options.test
      }
    }
  };
};
