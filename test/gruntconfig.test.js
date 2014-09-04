/* global suite, test */
var assert = require('assert');
var gruntConfig = require('../lib/gruntconfig');
var _ = require('lodash-node');

var expected = require('./fixtures/output');

suite('gruntConfig', function() {

  test('basic with data', function() {

    var grunt = {};
    var options = {
      configPath: __dirname+'/config',
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);
    assert.deepEqual(config, expected);
  });

  test('single overridePath as string', function() {

    var grunt = {};
    var options = {
      configPath: __dirname+'/config',
      overridePath: __dirname+'/config/override',
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'override';
    assert.deepEqual(config, expectedClone);

  });

  test('single overridePath as Array<string>', function() {

    var grunt = {};
    var options = {
      configPath: __dirname+'/config',
      overridePath: [__dirname+'/config/override'],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'override';
    assert.deepEqual(config, expectedClone);

  });

  test('multiple overridePath as Array<string>', function () {
    var grunt = {};
    var options = {
      configPath: __dirname+'/config',
      overridePath: [
        __dirname+'/config/override',
        __dirname+'/config/another-override',
      ],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'another-override';
    assert.deepEqual(config, expectedClone);

  });

});
