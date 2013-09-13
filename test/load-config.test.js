
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

    test('package.json', function() {

      assert.ok(gruntOptions.package);
      assert.equal(gruntOptions.package.name, 'grunt-load-config');

    });

    test('env', function() {

      assert.ok(gruntOptions.env);
      assert.ok(gruntOptions.env.USER);

    });

    test('config', function() {

      assert.equal(typeof gruntOptions.debug, 'boolean');
      assert.ok(gruntOptions.debug);

    });


  });

});
