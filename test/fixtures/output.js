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
  jsonfile: {
    jsonFile: {
      options: {
        filename: 'read.json'
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
