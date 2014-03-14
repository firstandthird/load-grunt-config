/* global suite, test */
var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var path = require('path');
var loadGruntConfig = require('../');


suite('index', function() {

  var original;
  //fake grunt
  var grunt = {
    initConfig: sinon.stub(),
    registerTask: sinon.stub()
  };

  var fixture = require('./fixtures/output');
  var gruntConfigStub = function(grunt, options, callback) {
    callback(null, fixture);
  };
  var gruntConfigSpy = sinon.spy(gruntConfigStub);
  var loadGruntTasksSpy = sinon.spy();

  setup(function(done) {
    original = loadGruntConfig;

    //hijack gruntConfig lib and just return back the options so we can test just the loadGruntConfig module
    loadGruntConfig = proxyquire('../', {
      './lib/gruntconfig': gruntConfigSpy,
      'load-grunt-tasks': loadGruntTasksSpy
    });
    done();

  });

  teardown(function(done) {
    loadGruntConfig = original;
    grunt.initConfig.reset();
    grunt.registerTask.reset();
    gruntConfigSpy.reset();
    loadGruntTasksSpy.reset();
    done();
  });


  suite('options', function() {

    test('should default to grunt dir', function(done) {
      loadGruntConfig(grunt, {}, function() {
        var args = gruntConfigSpy.args[0];
        var options = args[1];
        assert.equal(options.configPath, path.join(process.cwd(), 'grunt'));
        done();
      });
    });

    test('should default to init: true', function(done) {
      loadGruntConfig(grunt, {}, function() {
        var args = gruntConfigSpy.args[0];
        var options = args[1];
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
      loadGruntConfig(grunt, options, function() {
        var args = gruntConfigSpy.args[0];
        var options = args[1];
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
      loadGruntConfig(grunt, options, function() {
        var args = gruntConfigSpy.args[0];
        var options = args[1];
        assert.equal(options.data.test, 1);
        done();
      });

    });

    test('should have data object even if nothing passed in', function(done) {
      var options = {
      };
      loadGruntConfig(grunt, options, function() {
        var args = gruntConfigSpy.args[0];
        var options = args[1];
        assert.equal(typeof options.data, 'object');
        done();
      });

    });

    test('should pass contents of package.json to data', function(done) {
      loadGruntConfig(grunt, {}, function() {
        var args = gruntConfigSpy.args[0];
        var options = args[1];

        assert.equal(typeof options.data.package, 'object');
        assert.equal(options.data.package.name, 'load-grunt-config');
        done();

      });

    });

  });

  suite('grunt.initConfig', function() {

    test('should call by default', function(done) {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      }, function() {
        assert.ok(grunt.initConfig.calledOnce);
        var config = grunt.initConfig.args[0][0];
        assert.equal(typeof config, 'object');
        assert.deepEqual(config, fixture);
        done();
      });
    });

    test('should not call if init: false', function(done) {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        init: false
      }, function() {
        assert.ok(grunt.initConfig.notCalled);
        done();
      });
    });
  });


  suite('load-grunt-tasks', function() {

    test('should call by default', function(done) {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      }, function() {
        assert.ok(loadGruntTasksSpy.called);
        var args = loadGruntTasksSpy.args[0];
        assert.ok(args.length, 2);
        done();
      });
    });

    test('should pass in options', function(done) {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        loadGruntTasks: {
          test: 1
        }
      }, function() {
        assert.ok(loadGruntTasksSpy.called);
        var args = loadGruntTasksSpy.args[0];
        assert.deepEqual(args[1], { test: 1 });
        done();
      });

    });

    test('should not call if loadGruntTasks: false', function(done) {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        loadGruntTasks: false
      }, function() {
        assert.ok(loadGruntTasksSpy.notCalled);
        done();
      });
    });
  });


  suite('aliases', function() {
    test('should registerTask for each alias', function(done) {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      }, function() {
        assert.equal(grunt.registerTask.callCount, 1);
        var args = grunt.registerTask.args[0];
        assert.equal(args[0], 'default');
        assert.deepEqual(args[1], ['test']);
        done();
      });
    });
  });

});
