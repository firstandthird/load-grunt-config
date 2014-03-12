/* global suite, test */
var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var path = require('path');
var loadGruntConfig = require('../');


suite('index', function() {

  //fake grunt
  var grunt = {
    initConfig: function() {
    }
  };

  suite('options', function() {

    var original;
    var opts;
    setup(function(done) {
      original = loadGruntConfig;
      //hijack gruntConfig lib and just return back the options so we can test just the loadGruntConfig module
      loadGruntConfig = proxyquire('../', {
        './lib/gruntconfig': function(grunt, options, callback) {
          callback(null, options);
        }
      });
      done();

    });

    teardown(function(done) {
      loadGruntConfig = original;
      done();
    });


    test('should default to grunt dir', function(done) {
      loadGruntConfig(grunt, {}, function(err, options) {
        assert.equal(options.configPath, path.join(process.cwd(), 'grunt'));
        done();
      });
    });

    test('should default to init: true', function(done) {
      loadGruntConfig(grunt, {}, function(err, options) {
        assert.equal(options.init, true);
        done();
      });
    });


    test('should support legacy config var', function(done) {
      var options = {
        config: {
          test: 1
        }
      };
      loadGruntConfig(grunt, options, function(err, options) {
        assert.equal(options.data.test, 1);
        assert.equal(typeof options.config, 'undefined');
        done();
      });

    });

    test('should support data passed in', function(done) {
      var options = {
        data: {
          test: 1
        }
      };
      loadGruntConfig(grunt, options, function(err, options) {
        assert.equal(options.data.test, 1);
        done();
      });

    });

    test('should have data object even if nothing passed in', function(done) {
      var options = {
      };
      loadGruntConfig(grunt, options, function(err, options) {
        assert.equal(typeof options.data, 'object');
        done();
      });

    });

    test('should pass contents of package.json to data', function(done) {
      loadGruntConfig(grunt, {}, function(err, options) {

        assert.equal(typeof options.data.package, 'object');
        assert.equal(options.data.package.name, 'load-grunt-config');
        done();

      });

    });

  });

  suite('grunt.initConfig', function() {

    test('should call by default', function(done) {
      var grunt = { initConfig: function() {} };
      var spy = sinon.spy(grunt, 'initConfig');

      loadGruntConfig(grunt, {
        configPath: 'test/config'
      }, function() {
        assert.ok(spy.calledOnce);
        var config = spy.args[0][0];
        assert.equal(typeof config, 'object');
        assert.ok(config.yamlfile);
        done();

      });


    });

    test('should not call if init: false', function() {
      var grunt = { initConfig: function() {} };
      var spy = sinon.spy(grunt, 'initConfig');

      loadGruntConfig(grunt, {
        configPath: 'test/config',
        init: false
      }, function() {
        assert.equal(spy.called, false);
      });

    });

  });


  suite('load-grunt-tasks', function() {

    test('should call by default', function() {
    });

    test('should not call if loadGruntTasks: false', function() {
      
    });
    
  });


  suite('aliases', function() {
    test('should registerTask for each alias', function() { 

    });
  });

  
});
