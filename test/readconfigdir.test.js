/* global suite, test */

var assert = require('assert');
var readConfigDir = require('../lib/readconfigdir');
var expected = require('./fixtures/output');

suite('readConfigDir', function() {

  test('read fixture directory', function(done) {

    var grunt = {};
    var options = {
      test: 1
    };

    readConfigDir(__dirname+'/config', grunt, options, function(err, obj) {
      assert.deepEqual(obj, expected);
      done();
    });
  });
});
