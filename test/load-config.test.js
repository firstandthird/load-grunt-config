
var assert = require('assert');
var grunt = require('grunt');
var loadConfig = require('../lib/load-config');

suite('load-config', function() {

  suite('basic', function() {

    var gruntOptions;
    setup(function() {
      gruntOptions = loadConfig(grunt, { init: false, config: { debug: true } });
    });

    test('read ', function() {

      assert.ok(gruntOptions.jshint);
      assert.ok(gruntOptions.simplemocha);
      assert.ok(gruntOptions.watch);

    });

    test('grunt context passing ', function() {

      assert.notEqual(typeof gruntOptions.jshint, 'function');
      assert.ok(gruntOptions.jshint.all);

    });

    test('package.json', function() {

      assert.ok(gruntOptions.package);
      assert.equal(gruntOptions.package.name, 'load-grunt-config');

    });

    test('config', function() {

      assert.equal(typeof gruntOptions.debug, 'boolean');
      assert.ok(gruntOptions.debug);

    });

    test('load-grunt-tasks');


  });

});
