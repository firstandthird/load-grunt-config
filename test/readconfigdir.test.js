/* global suite, test */

var assert = require('assert');
var readConfigDir = require('../lib/readconfigdir');

suite('readConfigDir', function() {

  test('read fixture directory', function() {

    var grunt = {};
    var options = {
      test: 1
    };

    var obj = readConfigDir(__dirname+'/config', grunt, options);
    assert.deepEqual(obj, require('./fixtures/output'));
  });

  test('multiconfig', function() {
    var grunt = {};
    var obj = readConfigDir(__dirname+'/fixtures/multiconfig', grunt);
    var expected = require('./fixtures/output/multiconfig');
    assert.deepEqual(obj, expected);
  });

});
