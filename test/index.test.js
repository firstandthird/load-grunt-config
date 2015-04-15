/* global suite, test */
var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var path = require('path');
var _ = require('lodash');
var loadGruntConfig = require('../');


suite('index', function() {

  var original;
  //fake grunt
  var grunt = {
    initConfig: sinon.stub(),
    registerTask: sinon.stub()
  };

  var fixture = require('./fixtures/output');
  var fixtureWithPackage = _.cloneDeep(fixture);
  fixtureWithPackage.package = require('../package.json');

  var gruntConfigStub = function(grunt, options) {
    return fixture;
  };
  var gruntConfigSpy = sinon.spy(gruntConfigStub);
  var loadGruntTasksSpy = sinon.spy();
  var jitGruntStub = function(grunt, mappings) {
    return function(options) {};
  };
  var jitGruntSpy = sinon.spy(jitGruntStub);

  setup(function(done) {
    original = loadGruntConfig;

    //hijack gruntConfig lib and just return back the options so we can test just the loadGruntConfig module
    loadGruntConfig = proxyquire('../', {
      './lib/gruntconfig': gruntConfigSpy,
      'load-grunt-tasks': loadGruntTasksSpy,
      'jit-grunt': jitGruntSpy
    });
    done();

  });

  teardown(function(done) {
    loadGruntConfig = original;
    grunt.initConfig.reset();
    grunt.registerTask.reset();
    gruntConfigSpy.reset();
    loadGruntTasksSpy.reset();
    jitGruntSpy.reset();
    done();
  });


  suite('options', function() {

    test('should default to grunt dir', function() {
      loadGruntConfig(grunt, {});
      var args = gruntConfigSpy.args[0];
      var options = args[1];
      assert.equal(options.configPath, path.join(process.cwd(), 'grunt'));
    });

    test('should default to init: true', function() {
      loadGruntConfig(grunt, {});
      var args = gruntConfigSpy.args[0];
      var options = args[1];
      assert.equal(options.init, true);
    });

    test('should support data passed in', function() {
      var options = {
        data: {
          test: 1
        }
      };
      var out = loadGruntConfig(grunt, options);
      var args = gruntConfigSpy.args[0];
      var spyOptions = args[1];
      assert.equal(spyOptions.data.test, 1);
      assert.equal(out.test, 1);
    });

    test('should support legacy config var', function() {
      var options = {
        config: {
          test: 1
        }
      };
      var out = loadGruntConfig(grunt, options);
      var args = gruntConfigSpy.args[0];
      var spyOptions = args[1];
      assert.equal(spyOptions.data.test, 1);
      assert.equal(typeof spyOptions.config, 'undefined');
      assert.equal(out.test, 1);
    });

    test('should have data object even if nothing passed in', function() {
      var options = {
      };
      loadGruntConfig(grunt, options);
      var args = gruntConfigSpy.args[0];
      var spyOptions = args[1];
      assert.equal(typeof spyOptions.data, 'object');
    });

    test('should pass contents of package.json to data', function() {
      loadGruntConfig(grunt, {});
      var args = gruntConfigSpy.args[0];
      var options = args[1];

      assert.equal(typeof options.data.package, 'object');
      assert.equal(options.data.package.name, 'load-grunt-config');
    });

    test('should add package.json to config obj', function() {
      var config = loadGruntConfig(grunt, {});
      assert.equal(typeof config.package, 'object');
      assert.equal(config.package.name, 'load-grunt-config');
    });

    test('should call postProcess to allow manipulation of config', function() {
      var config = loadGruntConfig(grunt, {
        postProcess: function(config) {
          config.post = true;
        }
      });
      assert.equal(config.post, true);
    });

    test('should call preMerge to allow manipulation of config and data', function() {
      var spy = sinon.spy();
      loadGruntConfig(grunt, {
        preMerge: spy
      });

      assert.equal(spy.callCount, 1);
      var args = spy.getCall(0).args;
      assert.equal(args.length, 2);
      assert.equal(typeof args[0], 'object');
      assert.equal(typeof args[1], 'object');
    });

  });

  suite('grunt.initConfig', function() {

    test('should call by default', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      });
      assert.ok(grunt.initConfig.calledOnce);
      var config = grunt.initConfig.args[0][0];
      assert.equal(typeof config, 'object');
      assert.deepEqual(config, fixtureWithPackage);
    });

    test('should not call if init: false', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        init: false
      });
      assert.ok(grunt.initConfig.notCalled);
    });
  });


  suite('load-grunt-tasks', function() {

    test('should call by default', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      });
      assert.ok(loadGruntTasksSpy.called);
      var args = loadGruntTasksSpy.args[0];
      assert.ok(args.length, 2);
    });

    test('should pass in options', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        loadGruntTasks: {
          test: 1
        }
      });
      assert.ok(loadGruntTasksSpy.called);
      var args = loadGruntTasksSpy.args[0];
      assert.deepEqual(args[1], { test: 1 });
    });

    test('should not call if loadGruntTasks: false', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        loadGruntTasks: false
      });
      assert.ok(loadGruntTasksSpy.notCalled);
    });

    test('should not call if jitGrunt config specified', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        jitGrunt: {}
      });
      assert.ok(loadGruntTasksSpy.notCalled);
    });
  });

  suite('jit-grunt', function() {
    test('should not call by default', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      });
      assert.ok(jitGruntSpy.notCalled);
    });

    test('should call if jitGrunt config specified', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        jitGrunt: {}
      });
      assert.ok(jitGruntSpy.called);
      var args = jitGruntSpy.args[0];
      assert.ok(args.length, 2);
    });

    test('should call if jitGrunt: true', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        jitGrunt: true
      });
      assert.ok(jitGruntSpy.called);
      var args = jitGruntSpy.args[0];
      assert.ok(args.length, 2);
    });

    test('should not call if jitGrunt: false and gruntLoadTasks: false', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config',
        loadGruntTasks: false,
        jitGrunt: false
      });
      assert.ok(loadGruntTasksSpy.notCalled);
      assert.ok(jitGruntSpy.notCalled);
    });
  });

  suite('aliases', function() {
    test('should registerTask for each alias', function() {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      });
      assert.equal(grunt.registerTask.callCount, 2);
      var args = grunt.registerTask.args[0];
      assert.equal(args[0], 'default');
      assert.deepEqual(args[1], ['test']);
    });

    test('should pass the description if it\'s available', function () {
      loadGruntConfig(grunt, {
        configPath: 'test/config'
      });
      assert.equal(grunt.registerTask.callCount, 2);

      var args = grunt.registerTask.args[1];

      assert.equal(args[0], 'anotherTask');
      assert.equal(args[1], 'This is an awesome task');
      assert.equal(typeof args[2], 'function');
    });

    test('should support aliases to functions', function () {
      // Override the loadGruntConfig created at setup
      // Note the alternative of adding the alias into the fixture, implies lots
      // of changes in other tests
      var fnAliasFixture = {
        aliases: {
          aliasToFn: function () { return "A function"; }
        }
      };

      loadGruntConfig = proxyquire('../', {
        './lib/gruntconfig': function(grunt, options) {
          return fnAliasFixture;
        },
        'load-grunt-tasks': loadGruntTasksSpy,
        'jit-grunt': jitGruntSpy
      });

      loadGruntConfig(grunt, {
        configPath: 'test/config'
      });

      assert.equal(grunt.registerTask.callCount, 1);
      var args = grunt.registerTask.args[0];

      assert.equal(args[0], 'aliasToFn');
      assert.equal(typeof args[1], 'function');
    });

    test('should support aliases to functions with description', function () {
      // Same strategy as before
      var fnAliasFixture = {
        aliases: {
          aliasToFn: {
            'description' : 'This is an awesome task',
            'tasks' : function () { return "A function"; }
          }
        }
      };

      loadGruntConfig = proxyquire('../', {
        './lib/gruntconfig': function(grunt, options) {
          return fnAliasFixture;
        },
        'load-grunt-tasks': loadGruntTasksSpy,
        'jit-grunt': jitGruntSpy
      });

      loadGruntConfig(grunt, {
        configPath: 'test/config'
      });

      assert.equal(grunt.registerTask.callCount, 1);
      var args = grunt.registerTask.args[0];

      assert.equal(args[0], 'aliasToFn');
      assert.equal(args[1], 'This is an awesome task');
      assert.equal(typeof args[2], 'function');
      assert.equal(args[2](), 'A function');
    });
  });

});
