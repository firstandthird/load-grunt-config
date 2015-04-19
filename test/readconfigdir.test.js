/* global suite, test */

var assert = require('assert');
var sinon = require('sinon');
var readConfigDir = require('../lib/readconfigdir');

suite('readConfigDir', function() {

  test('read fixture directory', function() {

    var grunt = {};
    var options = {
      data: {test: 1}
    };

    var obj = readConfigDir(__dirname+'/config', grunt, options);
    assert.deepEqual(obj, require('./fixtures/output'));
  });

  test('uses specified mergeFunction', function() {
    var grunt = {};
    var spy = sinon.spy();
    var options = {
      mergeFunction: spy
    };

    readConfigDir(__dirname+'/config', grunt, options);
    assert.equal(spy.callCount, 8);
  });

  test('multiconfig', function() {
    var grunt = {};
    var obj = readConfigDir(__dirname+'/fixtures/multiconfig', grunt);
    var expected = require('./fixtures/output/multiconfig');
    assert.deepEqual(obj, expected);
  });

});
