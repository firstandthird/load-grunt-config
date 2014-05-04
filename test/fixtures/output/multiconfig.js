module.exports = {
  jshint: {
    test: {
      files: [
        '*.js'
      ]
    }
  },
  watch: {
    test: {
      files: [
        '*.js'
      ],
      tasks: [
        'scripts'
      ]
    }
  }
};
