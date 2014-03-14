/* global suite, test */

var assert = require('assert');
var readConfigDir = require('../lib/readconfigdir');
var expected = require('./fixtures/output');

suite('readConfigDir', function() {

  test('read fixture directory', function() {

    var grunt = {};
    var options = {
      test: 1
    };

    var obj = readConfigDir(__dirname+'/config', grunt, options);
    assert.deepEqual(obj, expected);
  });
});
