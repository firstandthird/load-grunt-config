/* global suite, test */

var assert = require('assert');
var readConfigDir = require('../lib/readconfigdir');

suite('readConfigDir', function() {

  test('read fixture directory', function(done) {

    var grunt = {};
    var options = {
      test: 1
    };

    readConfigDir(__dirname+'/fixtures', grunt, options, function(err, obj) {

      assert.deepEqual(obj, {
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
              filename: 'jsobj.js'
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
      });

      done();
    });
  });
});
