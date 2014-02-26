/* global suite, test */
var assert = require('assert');
var gruntConfig = require('../lib/gruntconfig');
var _ = require('lodash');

var expected = require('./fixtures/output');

suite('gruntConfig', function() {

  test('basic with data', function(done) {

    var grunt = {};
    var options = {
      configPath: __dirname+'/config',
      data: {
        test: 1
      }
    };

    gruntConfig(grunt, options, function(err, config) {
      assert.equal(err, null);
      assert.deepEqual(config, expected);
      done();
    });
  });

  test('overridePath', function(done) {

    var grunt = {};
    var options = {
      configPath: __dirname+'/config',
      overridePath: __dirname+'/config/override',
      data: {
        test: 1
      }
    };

    gruntConfig(grunt, options, function(err, config) {
      assert.equal(err, null);

      var expectedClone = _.clone(expected, true);
      expectedClone.jsobj.jsobjFile.options.filename = 'override';
      assert.deepEqual(config, expectedClone);

      done();
    });
  });

  
});
