module.exports = {
  aliases: {
    default: [
      'test'
    ]
  },
  coffeefile: {
    coffeeFile: {
      options: {
        filename: 'read.coffee'
      }
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
  yamlfile: {
    yamlFile: {
      options: {
        filename: 'read.yaml'
      }
    }
  },
  ymlfile: {
    ymlFile: {
      options: {
        filename: 'read.yml'
      }
    }
  }
};
