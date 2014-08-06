module.exports = {
  aliases: {
    test: [
      'jshint'
    ]
  },
  jshint: {
    test: {
      files: [
        '*.js'
      ]
    },
    test_blah: {
      files: [
        'test/*.js'
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
    },
    otherTarget: {
      files: [
        '*.html'
      ],
      tasks: [
        'html'
      ]
    }
  },
  copy: {
    jsfun: {
      src: '*.js',
      dest: 'build'
    }
  }
};
