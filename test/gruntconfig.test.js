/* global suite, test */
var assert = require('assert');
var sinon = require('sinon');
var gruntConfig = require('../lib/gruntconfig');
var _ = require('lodash');

var expected = require('./fixtures/output');

suite('gruntConfig', function() {


  test('no configPath', function () {
    var grunt = {};
    var options = {
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    assert.deepEqual(config, {});
  });


  test('empty configPath', function () {
    var grunt = {};
    var options = {
      configPath: [],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    assert.deepEqual(config, {});
  });


  test('single configPath', function() {
    var grunt = {};
    var options = {
      configPath: __dirname + '/config',
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);
    assert.deepEqual(config, expected);
  });


  test('multiple configPath', function () {
    var grunt = {};
    var options = {
      configPath: [
        __dirname + '/config',
        __dirname + '/config/override'
      ],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'override';
    assert.deepEqual(config, expectedClone);
  });


  test('empty overridePath', function () {
    var grunt = {};
    var options = {
      overridePath: [],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    assert.deepEqual(config, {});
  });


  test('single overridePath', function() {
    var grunt = {};
    var options = {
      overridePath: __dirname + '/config',
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);
    assert.deepEqual(config, expected);
  });


  test('multiple overridePath', function () {
    var grunt = {};
    var options = {
      overridePath: [
        __dirname + '/config',
        __dirname + '/config/override'
      ],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'override';
    assert.deepEqual(config, expectedClone);
  });


  test('empty configPath and overridePath', function () {
    var grunt = {};

    var options = {
      configPath: [],
      overridePath: [],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    assert.deepEqual(config, {});
  });


  test('single configPath with single overridePath', function () {
    var grunt = {};
    var options = {
      configPath: __dirname + '/config',
      overridePath: __dirname + '/config/override',
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'override';
    assert.deepEqual(config, expectedClone);
  });


  test('multiple configPath with single overridePath', function () {
    var grunt = {};
    var options = {
      configPath: [
        __dirname + '/config',
        __dirname + '/config/override'
      ],
      overridePath: __dirname + '/config/another-override',
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'another-override';
    assert.deepEqual(config, expectedClone);
  });


  test('single configPath with multiple overridePath', function () {
    var grunt = {};
    var options = {
      configPath: __dirname + '/config',
      overridePath: [
        __dirname + '/config/override',
        __dirname + '/config/another-override'
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


  test('multiple configPath with multiple overridePath', function () {
    var grunt = {};
    var options = {
      configPath: [
        __dirname + '/config',
        __dirname + '/config/override'
      ],
      overridePath: [
        __dirname + '/config/another-override',
        __dirname + '/config/override'
      ],
      data: {
        test: 1
      }
    };

    var config = gruntConfig(grunt, options);

    var expectedClone = _.clone(expected, true);
    expectedClone.jsobj.jsobjFile.options.filename = 'override';
    assert.deepEqual(config, expectedClone);
  });

  test('uses specified mergeFunction', function() {
    var grunt = {};
    var spy = sinon.spy();
    var options = {
      mergeFunction: spy,
      configPath: [
        __dirname + '/config'
      ]
    };
    gruntConfig(grunt, options);
    assert.equal(spy.callCount, 9);
  });

});
