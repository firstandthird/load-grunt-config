module.exports = {
  aliases: {
    default: [
      'test'
    ],
    anotherTask: {
      description: 'This is an awesome task',
      tasks: [
        'foo',
        'bar'
      ]
    }
  },
  jsfun: {
    jsFunFile: {
      options: {
        filename: 'jsfun.js',
        test: 1
      }
    }
  },
  jsobj: {
    jsobjFile: {
      options: {
        filename: 'jsobj.js',
        debug: true
      }
    }
  },
  cjsfun: {
    cjsFunFile: {
      options: {
        filename: 'cjsfun.cjs',
        test: 1
      }
    }
  },
  cjsobj: {
    cjsobjFile: {
      options: {
        filename: 'cjsobj.cjs',
        debug: true
      }
    }
  },
  jsonfile: {
    jsonFile: {
      options: {
        filename: 'read.json',
        regexp: '/(\\d{1,})\\%/'
      }
    }
  },
  csonfile: {
    csonFile: {
      options: {
        filename: 'read.cson'
      }
    }
  },
  yamlfile: {
    yamlFile: {
      options: {
        filename: 'read.yaml',
        regexp: /(\d{1,})\%/
      }
    }
  },
  ymlfile: {
    ymlFile: {
      options: {
        filename: 'read.yml',
        regexp: /(\d{1,})\%/
      }
    }
  }
};
